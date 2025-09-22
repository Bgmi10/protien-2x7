import { Hono } from 'hono';
import { Env } from '../types/env';
import { DatabaseClient } from '../db/client';
import { requireAdmin } from '../middleware/auth';

const sampleMenu = new Hono<{ Bindings: Env }>();

// SampleMenuDish type definition
interface SampleMenuDish {
  id: number;
  dish_name: string;
  ingredients: string; // JSON array as string
  quantity: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  sugar: number;
  fiber: number;
  image_url?: string;
  is_active: boolean;
  display_order?: number;
  created_at: string;
  updated_at: string;
}

// Get all active dishes (public endpoint)
sampleMenu.get('/', async (c) => {
  const db = new DatabaseClient(c.env);
  
  try {
    const dishes = await db.query<SampleMenuDish>(
      'SELECT * FROM sample_menu_dishes WHERE is_active = 1 ORDER BY display_order ASC, id ASC'
    );
    
    // Parse ingredients JSON for each dish
    const parsedDishes = dishes.map(dish => ({
      ...dish,
      ingredients: JSON.parse(dish.ingredients)
    }));
    
    return c.json({ success: true, data: parsedDishes });
  } catch (error) {
    console.error('Error fetching sample menu dishes:', error);
    return c.json({ success: false, error: 'Failed to fetch sample menu dishes' }, 500);
  }
});

// Get single dish by ID (public endpoint)
sampleMenu.get('/:id', async (c) => {
  const db = new DatabaseClient(c.env);
  const dishId = c.req.param('id');
  
  try {
    const dish = await db.queryOne<SampleMenuDish>(
      'SELECT * FROM sample_menu_dishes WHERE id = ? AND is_active = 1',
      [dishId]
    );
    
    if (!dish) {
      return c.json({ success: false, error: 'Dish not found' }, 404);
    }
    
    // Parse ingredients JSON
    const parsedDish = {
      ...dish,
      ingredients: JSON.parse(dish.ingredients)
    };
    
    return c.json({ success: true, data: parsedDish });
  } catch (error) {
    console.error('Error fetching dish:', error);
    return c.json({ success: false, error: 'Failed to fetch dish' }, 500);
  }
});

// Admin endpoints - protected with requireAdmin middleware

// Get all dishes including inactive (admin only)
sampleMenu.get('/admin/all', requireAdmin, async (c) => {
  const db = new DatabaseClient(c.env);
  
  try {
    const dishes = await db.query<SampleMenuDish>(
      'SELECT * FROM sample_menu_dishes ORDER BY display_order ASC, id ASC'
    );
    
    // Parse ingredients JSON for each dish
    const parsedDishes = dishes.map(dish => ({
      ...dish,
      ingredients: JSON.parse(dish.ingredients)
    }));
    
    return c.json({ success: true, data: parsedDishes });
  } catch (error) {
    console.error('Error fetching all dishes:', error);
    return c.json({ success: false, error: 'Failed to fetch dishes' }, 500);
  }
});

// Create new dish (admin only)
sampleMenu.post('/admin/create', requireAdmin, async (c) => {
  const db = new DatabaseClient(c.env);
  const user = c.get('user');
  
  const {
    dish_name,
    ingredients,
    quantity,
    calories,
    protein,
    carbs,
    fat,
    sugar,
    fiber,
    image_url
  } = await c.req.json();
  
  // Validate required fields
  if (!dish_name || !ingredients || !quantity || calories === undefined || 
      protein === undefined || carbs === undefined || fat === undefined || 
      sugar === undefined || fiber === undefined) {
    return c.json({ 
      success: false, 
      error: 'Missing required fields' 
    }, 400);
  }
  
  // Convert ingredients array to JSON string if needed
  const ingredientsJson = typeof ingredients === 'string' ? ingredients : JSON.stringify(ingredients);
  
  try {
    const result = await db.execute(
      `INSERT INTO sample_menu_dishes (
        dish_name, ingredients, quantity, calories, protein, carbs, fat, sugar, fiber, 
        image_url, created_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        dish_name,
        ingredientsJson,
        quantity,
        calories,
        protein,
        carbs,
        fat,
        sugar,
        fiber,
        image_url || null,
        user?.userId
      ]
    );
    
    // Fetch the created dish
    const dishId = result.meta.last_row_id;
    
    const dish = await db.queryOne<SampleMenuDish>(
      'SELECT * FROM sample_menu_dishes WHERE id = ?',
      [dishId]
    );
    
    if (dish) {
      // Parse ingredients JSON
      const parsedDish = {
        ...dish,
        ingredients: JSON.parse(dish.ingredients)
      };
      return c.json({ success: true, data: parsedDish }, 201);
    }
    
    return c.json({ success: true, data: { id: dishId } }, 201);
  } catch (error) {
    console.error('Error creating dish:', error);
    return c.json({ success: false, error: 'Failed to create dish' }, 500);
  }
});

// Update dish (admin only)
sampleMenu.put('/admin/:id', requireAdmin, async (c) => {
  const db = new DatabaseClient(c.env);
  const dishId = c.req.param('id');
  const updates = await c.req.json();
  
  // Build update query dynamically
  const allowedFields = [
    'dish_name', 'ingredients', 'quantity', 'calories', 'protein', 
    'carbs', 'fat', 'sugar', 'fiber', 'image_url', 'is_active', 'display_order'
  ];
  
  const updateFields: string[] = [];
  const updateValues: any[] = [];
  
  for (const field of allowedFields) {
    if (field in updates) {
      updateFields.push(`${field} = ?`);
      // Convert ingredients array to JSON string if needed
      if (field === 'ingredients' && typeof updates[field] !== 'string') {
        updateValues.push(JSON.stringify(updates[field]));
      } else {
        updateValues.push(updates[field]);
      }
    }
  }
  
  if (updateFields.length === 0) {
    return c.json({ success: false, error: 'No fields to update' }, 400);
  }
  
  // Add updated_at
  updateFields.push('updated_at = CURRENT_TIMESTAMP');
  updateValues.push(dishId); // For WHERE clause
  
  try {
    const result = await db.execute(
      `UPDATE sample_menu_dishes SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    );
    
    if (result.meta.changes === 0) {
      return c.json({ success: false, error: 'Dish not found' }, 404);
    }
    
    // Fetch updated dish
    const dish = await db.queryOne<SampleMenuDish>(
      'SELECT * FROM sample_menu_dishes WHERE id = ?',
      [dishId]
    );
    
    if (dish) {
      // Parse ingredients JSON
      const parsedDish = {
        ...dish,
        ingredients: JSON.parse(dish.ingredients)
      };
      return c.json({ success: true, data: parsedDish });
    }
    
    return c.json({ success: true, message: 'Dish updated successfully' });
  } catch (error) {
    console.error('Error updating dish:', error);
    return c.json({ success: false, error: 'Failed to update dish' }, 500);
  }
});

// Delete dish (admin only)
sampleMenu.delete('/admin/:id', requireAdmin, async (c) => {
  const db = new DatabaseClient(c.env);
  const dishId = c.req.param('id');

  try {
    const result = await db.execute(
      'DELETE FROM sample_menu_dishes WHERE id = ?',
      [dishId]
    );

    if (result.meta.changes === 0) {
      return c.json({ success: false, error: 'Dish not found' }, 404);
    }

    return c.json({ success: true, message: 'Dish deleted successfully' });
  } catch (error) {
    console.error('Error deleting dish:', error);
    return c.json({ success: false, error: 'Failed to delete dish' }, 500);
  }
});

// Bulk update display order (admin only)
sampleMenu.post('/admin/reorder', requireAdmin, async (c) => {
  const db = new DatabaseClient(c.env);
  const { orders } = await c.req.json(); // Array of { id, display_order }
  
  if (!Array.isArray(orders)) {
    return c.json({ success: false, error: 'Invalid request format' }, 400);
  }
  
  try {
    // Update each dish's display order in a transaction
    const statements = orders.map(({ id, display_order }) => ({
      sql: 'UPDATE sample_menu_dishes SET display_order = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      params: [display_order, id]
    }));
    
    await db.transaction(statements);
    
    return c.json({ success: true, message: 'Display order updated successfully' });
  } catch (error) {
    console.error('Error updating display order:', error);
    return c.json({ success: false, error: 'Failed to update display order' }, 500);
  }
});

// Get dish statistics (admin only)
sampleMenu.get('/admin/stats', requireAdmin, async (c) => {
  const db = new DatabaseClient(c.env);
  
  try {
    const stats = await Promise.all([
      db.queryOne<{ count: number }>('SELECT COUNT(*) as count FROM sample_menu_dishes WHERE is_active = 1'),
      db.queryOne<{ avg_calories: number }>('SELECT AVG(calories) as avg_calories FROM sample_menu_dishes WHERE is_active = 1'),
      db.queryOne<{ avg_protein: number }>('SELECT AVG(protein) as avg_protein FROM sample_menu_dishes WHERE is_active = 1'),
      db.queryOne<{ total_dishes: number }>('SELECT COUNT(*) as total_dishes FROM sample_menu_dishes')
    ]);
    
    return c.json({
      success: true,
      data: {
        active_dishes: stats[0]?.count || 0,
        average_calories: Math.round(stats[1]?.avg_calories || 0),
        average_protein: Math.round(stats[2]?.avg_protein || 0),
        total_dishes: stats[3]?.total_dishes || 0
      }
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return c.json({ success: false, error: 'Failed to fetch statistics' }, 500);
  }
});

export default sampleMenu;