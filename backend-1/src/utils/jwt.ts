import { SignJWT, jwtVerify } from 'jose';
import { Env } from '../types/env';

interface TokenPayload {
  userId: number;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

/**
 * Generate JWT token
 */
export async function generateToken(payload: Omit<TokenPayload, 'iat' | 'exp'>, env: Env): Promise<string> {
  const secret = new TextEncoder().encode(env.JWT_SECRET || 'your-secret-key-change-in-production');
  
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret);
    
  return token;
}

/**
 * Generate refresh token with longer expiry
 */
export async function generateRefreshToken(payload: Omit<TokenPayload, 'iat' | 'exp'>, env: Env): Promise<string> {
  const secret = new TextEncoder().encode(env.JWT_SECRET || 'your-secret-key-change-in-production');
  
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);
    
  return token;
}

/**
 * Verify JWT token
 */
export async function verifyToken(token: string, env: Env): Promise<TokenPayload | null> {
  try {
    const secret = new TextEncoder().encode(env.JWT_SECRET || 'your-secret-key-change-in-production');
    
    const { payload } = await jwtVerify(token, secret);
    
    return payload as TokenPayload;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

/**
 * Extract token from Authorization header or cookie
 */
export function extractToken(request: Request): string | null {
  // Check Authorization header
  const authHeader = request.headers.get('Authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  
  // Check cookies
  const cookieHeader = request.headers.get('Cookie');
  if (cookieHeader) {
    const cookies = Object.fromEntries(
      cookieHeader.split('; ').map(c => c.split('='))
    );
    return cookies['auth_token'] || null;
  }
  
  return null;
}