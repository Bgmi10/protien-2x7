import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { Env } from './types/env';
import { DatabaseClient } from './db/client';
import users from './routes/users';
import auth from './routes/auth';
import mealPlans from './routes/meal-plans';

const app = new Hono<{ Bindings: Env }>();

// Middleware
app.use('*', logger());
app.use('*', cors({
  origin: (origin) => {
    // Allow requests from these origins
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:3000',
      'https://protein2x7.com'
    ];
    return origin ? allowedOrigins.includes(origin) : true;
  },
  credentials: true, // This is crucial for cookies to work
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

// Health check endpoint
app.get('/health', async (c) => {
  const db = new DatabaseClient(c.env);
  
  try {
    // Test database connection
    await db.query('SELECT 1');
    
    return c.json({
      status: 'healthy',
      environment: c.env.ENVIRONMENT,
      apiVersion: c.env.API_VERSION,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return c.json({
      status: 'unhealthy',
      error: 'Database connection failed',
      timestamp: new Date().toISOString(),
    }, 500);
  }
});

// API Info endpoint
app.get('/', (c) => {
  return c.json({
    name: 'protein2x7 API',
    version: c.env.API_VERSION,
    environment: c.env.ENVIRONMENT,
    endpoints: {
      health: '/health',
      users: '/api/v1/users',
      mealPlans: '/api/v1/meal-plans',
      subscriptions: '/api/v1/subscriptions',
      orders: '/api/v1/orders',
      meals: '/api/v1/meals',
    },
  });
});

// Initialize database (run migrations on first request if needed)
app.get('/api/init-db', async (c) => {
  const db = new DatabaseClient(c.env);
  
  try {
    // Check if tables exist
    const tables = await db.query<{ name: string }>(
      "SELECT name FROM sqlite_master WHERE type='table'"
    );
    
    if (tables.length === 0) {
      return c.json({
        success: false,
        message: 'No tables found. Please run migrations using: npx wrangler d1 migrations apply protein2x7-db',
      });
    }
    
    return c.json({
      success: true,
      message: 'Database initialized',
      tables: tables.map(t => t.name),
    });
  } catch (error) {
    return c.json({
      success: false,
      error: 'Failed to initialize database',
      details: error instanceof Error ? error.message : 'Unknown error',
    }, 500);
  }
});

// Mount routes
app.route('/api/v1/auth', auth);
app.route('/api/v1/users', users);
app.route('/api/v1/meal-plans', mealPlans);

// 404 handler
app.notFound((c) => {
  return c.json({ error: 'Not Found' }, 404);
});

// Error handler
app.onError((err, c) => {
  console.error(`${err}`);
  return c.json({ error: 'Internal Server Error' }, 500);
});

export default app;