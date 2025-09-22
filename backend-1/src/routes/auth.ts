import { Hono } from 'hono';
import bcrypt from 'bcryptjs';
import { Env } from '../types/env';
import { DatabaseClient } from '../db/client';
import { generateToken, generateRefreshToken } from '../utils/jwt';
import { runSeeds } from '../db/seed';
import { setCookie, deleteCookie } from 'hono/cookie';
import { requireAdmin, requireAuth } from '../middleware/auth';

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
      return c.json({ success: false, error: 'Invalid credentials' }, 402);
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

auth.post('/logout', requireAuth, async (c) => {
  deleteCookie(c, "auth_token", {
    httpOnly: true,
    secure: c.env.ENVIRONMENT === "production" ? true : false,
    path: "/",
    sameSite: "none"
  });
  return c.json({ success: true, message: 'Logged out successfully' });
});

auth.get('/admin/profile', requireAdmin, async (c) => {
  const { userId } = c.get('user');
  const db = new DatabaseClient(c.env);

  const user = await db.queryOne<{
    id: number;
    email: string;
    name: string;
    phone: string;
    role: string;
    last_login: string;
    created_at: string;
  }>(
    'SELECT id, email, name, phone, role, last_login, created_at FROM users WHERE id = ?',
    [userId]
  );
  
  if (!user) {
    return c.json({ success: false, error: 'Admin not found' }, 404);
  }

  return c.json({
    success: true,
    user,
  });
});

export default auth;