import { Hono } from 'hono';
import { Env } from '../types/env';
import { DatabaseClient } from '../db/client';
import { requireAuth, requireAdmin } from '../middleware/auth';

const mealPlans = new Hono<{ Bindings: Env }>();

// MealPlan type definition
interface MealPlan {
  id: number;
  name: string;
  number_of_meals: number;
  original_cost: number;
  discounted_price: number;
  discount_percent: number;
  duration_days?: number;
  meal_type?: string;
  plan_type?: string;
  is_trial: boolean;
  is_active: boolean;
  display_order?: number;
  description?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

// Get all meal plans (public endpoint)
mealPlans.get('/', async (c) => {
  const db = new DatabaseClient(c.env);
  
  try {
    const plans = await db.query<MealPlan>(
      'SELECT * FROM meal_plans WHERE is_active = 1 ORDER BY display_order ASC, id ASC'
    );
    
    return c.json({ success: true, data: plans });
  } catch (error) {
    console.error('Error fetching meal plans:', error);
    return c.json({ success: false, error: 'Failed to fetch meal plans' }, 500);
  }
});

// Get single meal plan by ID (public endpoint)
mealPlans.get('/:id', async (c) => {
  const db = new DatabaseClient(c.env);
  const planId = c.req.param('id');
  
  try {
    const plan = await db.queryOne<MealPlan>(
      'SELECT * FROM meal_plans WHERE id = ? AND is_active = 1',
      [planId]
    );
    
    if (!plan) {
      return c.json({ success: false, error: 'Meal plan not found' }, 404);
    }
    
    return c.json({ success: true, data: plan });
  } catch (error) {
    console.error('Error fetching meal plan:', error);
    return c.json({ success: false, error: 'Failed to fetch meal plan' }, 500);
  }
});

// Admin endpoints - protected with requireAdmin middleware

// Get all meal plans including inactive (admin only)
mealPlans.get('/admin/all', requireAdmin, async (c) => {
  const db = new DatabaseClient(c.env);
  
  try {
    const plans = await db.query<MealPlan>(
      'SELECT * FROM meal_plans ORDER BY display_order ASC, id ASC'
    );
    
    return c.json({ success: true, data: plans });
  } catch (error) {
    console.error('Error fetching all meal plans:', error);
    return c.json({ success: false, error: 'Failed to fetch meal plans' }, 500);
  }
});

// Create new meal plan (admin only)
mealPlans.post('/admin/create', requireAdmin, async (c) => {
  const db = new DatabaseClient(c.env);
  const user = c.get('user');
  
  const {
    name,
    number_of_meals,
    original_cost,
    discounted_price,
    duration_days,
    meal_type,
    plan_type,
    is_trial,
    description,
    image_url
  } = await c.req.json();
  
  // Validate required fields
  if (!name || !number_of_meals || !original_cost || !discounted_price) {
    return c.json({ 
      success: false, 
      error: 'Missing required fields: name, number_of_meals, original_cost, discounted_price' 
    }, 400);
  }
  
  // Calculate discount percentage
  const discount_percent = Math.round(((original_cost - discounted_price) / original_cost) * 100);
  
  // Log the data being inserted
  console.log('Creating meal plan with name:', name);
  console.log('Type of name:', typeof name);
  console.log('is_trial value:', is_trial, 'converted to:', is_trial === true ? 1 : 0);
  console.log('All values being inserted:', {
    name,
    number_of_meals,
    original_cost, 
    discounted_price,
    discount_percent,
    duration_days: duration_days || null,
    meal_type: meal_type || null,
    plan_type: plan_type || 'individual',
    is_trial: is_trial === true ? 1 : 0,
    description: description || null,
    created_by: user?.userId,
    image_url: image_url || null
  });
  
  try {
    const result = await db.execute(
      `INSERT INTO meal_plans (
        name, number_of_meals, original_cost, discounted_price, discount_percent,
        duration_days, meal_type, plan_type, is_trial, description, created_by, image_url
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        number_of_meals,
        original_cost,
        discounted_price,
        discount_percent,
        duration_days || null,
        meal_type || null,
        plan_type || 'individual',
        is_trial === true ? 1 : 0,  // More explicit check
        description || null,
        user?.userId,
        image_url || null
      ]
    );
    
    // Fetch the created plan
    const planId = result.meta.last_row_id;
    console.log('Fetching created plan with ID:', planId);
    
    const plan = await db.queryOne<MealPlan>(
      'SELECT id, name, number_of_meals, original_cost, discounted_price, discount_percent, duration_days, meal_type, plan_type, is_trial, is_active, display_order, description, image_url, created_at, updated_at FROM meal_plans WHERE id = ?',
      [planId]
    );
    
    console.log('Created plan name:', plan?.name);
    console.log('Full created plan:', plan);
    
    return c.json({ success: true, data: plan }, 201);
  } catch (error) {
    console.error('Error creating meal plan:', error);
    return c.json({ success: false, error: 'Failed to create meal plan' }, 500);
  }
});

// Update meal plan (admin only)
mealPlans.put('/admin/:id', requireAdmin, async (c) => {
  const db = new DatabaseClient(c.env);
  const planId = c.req.param('id');
  const updates = await c.req.json();
  
  // Build update query dynamically
  const allowedFields = [
    'name', 'number_of_meals', 'original_cost', 'discounted_price',
    'duration_days', 'meal_type', 'plan_type', 'is_trial', 
    'is_active', 'display_order', 'description', 'image_url'
  ];
  
  const updateFields: string[] = [];
  const updateValues: any[] = [];
  
  for (const field of allowedFields) {
    if (field in updates) {
      updateFields.push(`${field} = ?`);
      updateValues.push(updates[field]);
    }
  }
  
  if (updateFields.length === 0) {
    return c.json({ success: false, error: 'No fields to update' }, 400);
  }
  
  // Recalculate discount if prices changed
  if (updates.original_cost && updates.discounted_price) {
    const discount = Math.round(((updates.original_cost - updates.discounted_price) / updates.original_cost) * 100);
    updateFields.push('discount_percent = ?');
    updateValues.push(discount);
  }
  
  // Add updated_at
  updateFields.push('updated_at = CURRENT_TIMESTAMP');
  updateValues.push(planId); // For WHERE clause
  
  try {
    const result = await db.execute(
      `UPDATE meal_plans SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    );
    
    if (result.meta.changes === 0) {
      return c.json({ success: false, error: 'Meal plan not found' }, 404);
    }
    
    // Fetch updated plan
    const plan = await db.queryOne<MealPlan>(
      'SELECT * FROM meal_plans WHERE id = ?',
      [planId]
    );
    
    return c.json({ success: true, data: plan });
  } catch (error) {
    console.error('Error updating meal plan:', error);
    return c.json({ success: false, error: 'Failed to update meal plan' }, 500);
  }
});

// Delete meal plan (admin only)
mealPlans.delete('/admin/:id', requireAdmin, async (c) => {
  const db = new DatabaseClient(c.env);
  const planId = c.req.param('id');

  try {
    // Hard delete: completely remove the record
    const result = await db.execute(
      'DELETE FROM meal_plans WHERE id = ?',
      [planId]
    );

    if (result.meta.changes === 0) {
      return c.json({ success: false, error: 'Meal plan not found' }, 404);
    }

    return c.json({ success: true, message: 'Meal plan deleted successfully' });
  } catch (error) {
    console.error('Error deleting meal plan:', error);
    return c.json({ success: false, error: 'Failed to delete meal plan' }, 500);
  }
});

// Bulk update display order (admin only)
mealPlans.post('/admin/reorder', requireAdmin, async (c) => {
  const db = new DatabaseClient(c.env);
  const { orders } = await c.req.json(); // Array of { id, display_order }
  
  if (!Array.isArray(orders)) {
    return c.json({ success: false, error: 'Invalid request format' }, 400);
  }
  
  try {
    // Update each plan's display order in a transaction
    const statements = orders.map(({ id, display_order }) => ({
      sql: 'UPDATE meal_plans SET display_order = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      params: [display_order, id]
    }));
    
    await db.transaction(statements);
    
    return c.json({ success: true, message: 'Display order updated successfully' });
  } catch (error) {
    console.error('Error updating display order:', error);
    return c.json({ success: false, error: 'Failed to update display order' }, 500);
  }
});

// Get meal plan statistics (admin only)
mealPlans.get('/admin/stats', requireAdmin, async (c) => {
  const db = new DatabaseClient(c.env);
  
  try {
    const stats = await Promise.all([
      db.queryOne<{ count: number }>('SELECT COUNT(*) as count FROM meal_plans WHERE is_active = 1'),
      db.queryOne<{ count: number }>('SELECT COUNT(*) as count FROM meal_plans WHERE is_trial = 1'),
      db.queryOne<{ avg_discount: number }>('SELECT AVG(discount_percent) as avg_discount FROM meal_plans WHERE is_active = 1'),
      db.queryOne<{ total_plans: number }>('SELECT COUNT(*) as total_plans FROM meal_plans')
    ]);
    
    return c.json({
      success: true,
      data: {
        active_plans: stats[0]?.count || 0,
        trial_plans: stats[1]?.count || 0,
        average_discount: Math.round(stats[2]?.avg_discount || 0),
        total_plans: stats[3]?.total_plans || 0
      }
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return c.json({ success: false, error: 'Failed to fetch statistics' }, 500);
  }
});

export default mealPlans;