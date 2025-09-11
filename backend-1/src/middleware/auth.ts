import { Context, Next } from 'hono';
import { Env } from '../types/env';
import { verifyToken } from '../utils/jwt';
import { DatabaseClient } from '../db/client';

interface AuthUser {
  userId: number;
  email: string;
  role: string;
}

/**
 * Middleware to verify authentication
 */
export async function requireAuth(c: Context<{ Bindings: Env }>, next: Next) {
  // Extract token from cookie
  const cookieHeader = c.req.header('Cookie');
  const token = cookieHeader?.match(/auth_token=([^;]+)/)?.[1];

  if (!token) {
    return c.json({ success: false, error: 'Authentication required' }, 401);
  }

  // Verify token
  const payload = await verifyToken(token, c.env);
  
  if (!payload) {
    return c.json({ success: false, error: 'Invalid or expired token' }, 401);
  }

  // Check if session is valid
  const db = new DatabaseClient(c.env);
  const session = await db.queryOne<{ expires_at: string }>(
    'SELECT expires_at FROM sessions WHERE token = ? AND expires_at > CURRENT_TIMESTAMP',
    [token]
  );

  if (!session) {
    return c.json({ success: false, error: 'Session expired' }, 401);
  }

  // Check if user is active
  const user = await db.queryOne<{ is_active: boolean }>(
    'SELECT is_active FROM users WHERE id = ? AND is_active = 1',
    [payload.userId]
  );

  if (!user) {
    return c.json({ success: false, error: 'Account inactive or not found' }, 403);
  }

  // Add user info to context
  c.set('user', {
    userId: payload.userId,
    email: payload.email,
    role: payload.role
  } as AuthUser);

  await next();
}

/**
 * Middleware to require admin role
 */
export async function requireAdmin(c: Context<{ Bindings: Env }>, next: Next) {
  // First check authentication
  await requireAuth(c, next);

  // Check if response was already sent (auth failed)
  if (c.res) {
    return;
  }

  // Get user from context
  const user = c.get('user') as AuthUser;

  if (!user || user.role !== 'admin') {
    return c.json({ success: false, error: 'Admin access required' }, 403);
  }

  await next();
}

/**
 * Optional auth middleware - doesn't fail if no token
 */
export async function optionalAuth(c: Context<{ Bindings: Env }>, next: Next) {
  const cookieHeader = c.req.header('Cookie');
  const token = cookieHeader?.match(/auth_token=([^;]+)/)?.[1];

  if (token) {
    const payload = await verifyToken(token, c.env);
    if (payload) {
      c.set('user', {
        userId: payload.userId,
        email: payload.email,
        role: payload.role
      } as AuthUser);
    }
  }

  await next();
}