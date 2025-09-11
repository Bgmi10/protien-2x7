import { Hono } from 'hono';
import { Env } from '../types/env';
import { DatabaseClient } from '../db/client';
import bcrypt from 'bcryptjs';

const users = new Hono<{ Bindings: Env }>();

// User type definition
interface User {
  id: number;
  email: string;
  phone: string;
  name: string;
  created_at: string;
  updated_at: string;
}

// Get all users
users.get('/', async (c) => {
  const db = new DatabaseClient(c.env);
  
  try {
    const users = await db.query<User>('SELECT id, email, phone, name, created_at, updated_at FROM users');
    return c.json({ success: true, data: users });
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch users' }, 500);
  }
});

// Get user by ID
users.get('/:id', async (c) => {
  const db = new DatabaseClient(c.env);
  const userId = c.req.param('id');
  
  try {
    const user = await db.queryOne<User>(
      'SELECT id, email, phone, name, created_at, updated_at FROM users WHERE id = ?',
      [userId]
    );
    
    if (!user) {
      return c.json({ success: false, error: 'User not found' }, 404);
    }
    
    return c.json({ success: true, data: user });
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch user' }, 500);
  }
});

// Create new user
users.post('/', async (c) => {
  const db = new DatabaseClient(c.env);
  const { email, phone, name, password } = await c.req.json();
  
  // Validate input
  if (!email || !phone || !name || !password) {
    return c.json({ success: false, error: 'Missing required fields' }, 400);
  }
  
  try {
    // Hash password
    const password_hash = await bcrypt.hash(password, 10);
    
    // Insert user
    const result = await db.execute(
      'INSERT INTO users (email, phone, name, password_hash) VALUES (?, ?, ?, ?)',
      [email, phone, name, password_hash]
    );
    
    // Fetch the created user
    const user = await db.queryOne<User>(
      'SELECT id, email, phone, name, created_at, updated_at FROM users WHERE id = ?',
      [result.meta.last_row_id]
    );
    
    return c.json({ success: true, data: user }, 201);
  } catch (error) {
    // Check for unique constraint violations
    if (error instanceof Error && error.message.includes('UNIQUE')) {
      return c.json({ success: false, error: 'Email or phone already exists' }, 409);
    }
    return c.json({ success: false, error: 'Failed to create user' }, 500);
  }
});

// Update user
users.put('/:id', async (c) => {
  const db = new DatabaseClient(c.env);
  const userId = c.req.param('id');
  const { email, phone, name } = await c.req.json();
  
  try {
    // Build update query dynamically
    const updates: string[] = [];
    const params: unknown[] = [];
    
    if (email) {
      updates.push('email = ?');
      params.push(email);
    }
    if (phone) {
      updates.push('phone = ?');
      params.push(phone);
    }
    if (name) {
      updates.push('name = ?');
      params.push(name);
    }
    
    if (updates.length === 0) {
      return c.json({ success: false, error: 'No fields to update' }, 400);
    }
    
    updates.push('updated_at = CURRENT_TIMESTAMP');
    params.push(userId);
    
    const result = await db.execute(
      `UPDATE users SET ${updates.join(', ')} WHERE id = ?`,
      params
    );
    
    if (result.meta.changes === 0) {
      return c.json({ success: false, error: 'User not found' }, 404);
    }
    
    // Fetch updated user
    const user = await db.queryOne<User>(
      'SELECT id, email, phone, name, created_at, updated_at FROM users WHERE id = ?',
      [userId]
    );
    
    return c.json({ success: true, data: user });
  } catch (error) {
    if (error instanceof Error && error.message.includes('UNIQUE')) {
      return c.json({ success: false, error: 'Email or phone already exists' }, 409);
    }
    return c.json({ success: false, error: 'Failed to update user' }, 500);
  }
});

// Delete user
users.delete('/:id', async (c) => {
  const db = new DatabaseClient(c.env);
  const userId = c.req.param('id');
  
  try {
    const result = await db.execute('DELETE FROM users WHERE id = ?', [userId]);
    
    if (result.meta.changes === 0) {
      return c.json({ success: false, error: 'User not found' }, 404);
    }
    
    return c.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    return c.json({ success: false, error: 'Failed to delete user' }, 500);
  }
});

export default users;