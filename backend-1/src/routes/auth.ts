import { Hono } from 'hono';
import bcrypt from 'bcryptjs';
import { Env } from '../types/env';
import { DatabaseClient } from '../db/client';
import { generateToken, generateRefreshToken, verifyToken } from '../utils/jwt';
import { runSeeds } from '../db/seed';
import { setCookie } from 'hono/cookie';

const auth = new Hono<{ Bindings: Env }>();

interface User {
  id: number;
  email: string;
  phone: string;
  name: string;
  password_hash: string;
  role: string;
  is_active: boolean;
}

// Initialize admin (seed endpoint)
auth.post('/init-admin', async (c) => {
  try {
    const result = await runSeeds(c.env);
    
    if (!result.success) {
      return c.json({ success: false, error: result.error }, 500);
    }
    
    return c.json({ success: true, message: 'Admin initialized successfully' });
  } catch (error) {
    return c.json({ 
      success: false, 
      error: 'Failed to initialize admin',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});

// Login endpoint
auth.post('/login', async (c) => {
  const db = new DatabaseClient(c.env);
  const { email, password } = await c.req.json();
  console.log("DB binding is:", c.env);
  if (!email || !password) {
    return c.json({ success: false, error: 'Email and password are required' }, 400);
  }
  
  try {
    // Find user by email
    const user = await db.queryOne<User>(
      'SELECT * FROM users WHERE email = ? AND is_active = 1',
      [email]
    );
    
    if (!user) {
      return c.json({ success: false, error: 'Invalid credentials' }, 401);
    }
    
    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    
    if (!isValidPassword) {
      return c.json({ success: false, error: 'Invalid credentials' }, 401);
    }
    
    // Generate tokens
    const tokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role
    };
    
    const accessToken = await generateToken(tokenPayload, c.env);
    const refreshToken = await generateRefreshToken(tokenPayload, c.env);
    
    // Update last login
    await db.execute(
      'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?',
      [user.id]
    );
    
    // Store session
    await db.execute(
      'INSERT INTO sessions (user_id, token, expires_at, ip_address, user_agent) VALUES (?, ?, datetime("now", "+24 hours"), ?, ?)',
      [user.id, accessToken, c.req.header('CF-Connecting-IP') || 'unknown', c.req.header('User-Agent') || 'unknown']
    );
    
    setCookie(c, "auth_token", accessToken, {
      domain: c.env.ENVIRONMENT === "production" ? "" : "localhost",
      httpOnly: true,
      secure: c.env.ENVIRONMENT === "production" ? true : false,
      path: "/",
      sameSite: "none"
    });


    return c.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      accessToken,
      refreshToken
    });
  } catch (error) {
    return c.json({ success: false, error: 'Login failed' }, 500);
  }
});

// Logout endpoint
auth.post('/logout', async (c) => {
  const db = new DatabaseClient(c.env);
  // Extract token from cookie
  const cookieHeader = c.req.header('Cookie');
  const token = cookieHeader?.match(/auth_token=([^;]+)/)?.[1];
  
  if (token) {
    try {
      // Remove session from database
      await db.execute('DELETE FROM sessions WHERE token = ?', [token]);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
  
  // Clear cookie
  c.header('Set-Cookie', 'auth_token=; Path=/; HttpOnly; Max-Age=0');
  
  return c.json({ success: true, message: 'Logged out successfully' });
});

// Verify token endpoint
auth.get('/verify', async (c) => {
  // Extract token from cookie only
  const cookieHeader = c.req.header('Cookie');
  const token = cookieHeader?.match(/auth_token=([^;]+)/)?.[1];
  
  if (!token) {
    return c.json({ success: false, error: 'No token provided' }, 401);
  }
  
  const payload = await verifyToken(token, c.env);
  
  if (!payload) {
    return c.json({ success: false, error: 'Invalid token' }, 401);
  }
  
  const db = new DatabaseClient(c.env);
  
  // Check if session exists and is valid
  const session = await db.queryOne<{ expires_at: string }>(
    'SELECT expires_at FROM sessions WHERE token = ? AND expires_at > CURRENT_TIMESTAMP',
    [token]
  );
  
  if (!session) {
    return c.json({ success: false, error: 'Session expired' }, 401);
  }
  
  // Get user details
  const user = await db.queryOne<{ id: number; email: string; name: string; role: string }>(
    'SELECT id, email, name, role FROM users WHERE id = ? AND is_active = 1',
    [payload.userId]
  );
  
  if (!user) {
    return c.json({ success: false, error: 'User not found' }, 404);
  }
  
  return c.json({ success: true, user });
});

// Admin profile endpoint
auth.get('/admin/profile', async (c) => {
  // Extract token from cookie only
  const cookieHeader = c.req.header('Cookie');
  const token = cookieHeader?.match(/auth_token=([^;]+)/)?.[1];
  
  if (!token) {
    return c.json({ success: false, error: 'Unauthorized' }, 401);
  }
  
  const payload = await verifyToken(token, c.env);
  
  if (!payload || payload.role !== 'admin') {
    return c.json({ success: false, error: 'Admin access required' }, 403);
  }
  
  const db = new DatabaseClient(c.env);
  
  const admin = await db.queryOne<{
    id: number;
    email: string;
    name: string;
    phone: string;
    role: string;
    last_login: string;
    created_at: string;
  }>(
    'SELECT id, email, name, phone, role, last_login, created_at FROM users WHERE id = ?',
    [payload.userId]
  );
  
  if (!admin) {
    return c.json({ success: false, error: 'Admin not found' }, 404);
  }
  
  // Get admin statistics
  const stats = await Promise.all([
    db.queryOne<{ count: number }>('SELECT COUNT(*) as count FROM users'),
    db.queryOne<{ count: number }>('SELECT COUNT(*) as count FROM orders'),
    db.queryOne<{ count: number }>('SELECT COUNT(*) as count FROM subscriptions WHERE status = "active"'),
    db.queryOne<{ total: number }>('SELECT SUM(total_amount) as total FROM orders WHERE payment_status = "paid"')
  ]);
  
  return c.json({
    success: true,
    admin,
    statistics: {
      totalUsers: stats[0]?.count || 0,
      totalOrders: stats[1]?.count || 0,
      activeSubscriptions: stats[2]?.count || 0,
      totalRevenue: stats[3]?.total || 0
    }
  });
});

export default auth;