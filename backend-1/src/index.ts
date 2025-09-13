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
  origin: [
    'http://localhost:5173',
    'https://protien-2x7.vercel.app',
  ],
  credentials: true, // This is crucial for cookies to work
  allowHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Set-Cookie'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  exposeHeaders: ['Set-Cookie'],
  maxAge: 86400,
}));

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