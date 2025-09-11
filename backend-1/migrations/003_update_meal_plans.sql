-- Drop old meal_plans table if exists
DROP TABLE IF EXISTS meal_plans;

-- Create new meal_plans table matching the admin panel structure
CREATE TABLE IF NOT EXISTS meal_plans (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  number_of_meals INTEGER NOT NULL,
  original_cost DECIMAL(10, 2) NOT NULL,
  discounted_price DECIMAL(10, 2) NOT NULL,
  discount_percent INTEGER NOT NULL,
  duration_days INTEGER, -- 3, 5, 7, 14, 28 days
  meal_type TEXT, -- 'lunch', 'dinner', 'both'
  plan_type TEXT, -- 'individual', 'couple'
  is_trial BOOLEAN DEFAULT 0,
  is_active BOOLEAN DEFAULT 1,
  display_order INTEGER DEFAULT 0,
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_by INTEGER,
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Insert default meal plans from the image
INSERT INTO meal_plans (name, number_of_meals, original_cost, discounted_price, discount_percent, duration_days, meal_type, plan_type, is_trial, display_order) VALUES
('Power Lunch 3 - Trial Pack', 3, 750, 495, 34, 3, 'lunch', 'individual', 1, 1),
('Power Lunch 5 (Workweek)', 5, 1250, 1175, 6, 5, 'lunch', 'individual', 0, 2),
('Power Lunch Week Plan', 7, 1750, 1645, 6, 7, 'lunch', 'individual', 0, 3),
('2-Week Power Lunch Plan', 14, 3500, 3220, 8, 14, 'lunch', 'individual', 0, 4),
('Lean Dinner Week Plan', 7, 1750, 1645, 6, 7, 'dinner', 'individual', 0, 5),
('2-Week Lean Dinner Plan', 14, 3500, 3220, 8, 14, 'dinner', 'individual', 0, 6),
('Couple Wellness Week Lunch Plan', 14, 3500, 3220, 8, 7, 'lunch', 'couple', 0, 7),
('2-Week Couple Wellness Lunch Plan', 28, 7000, 6300, 10, 14, 'lunch', 'couple', 0, 8),
('Couple Wellness Week Lean Dinner Plan', 14, 3500, 3220, 8, 7, 'dinner', 'couple', 0, 9),
('2-Week Couple Wellness Lean Dinner Plan', 28, 7000, 6300, 10, 14, 'dinner', 'couple', 0, 10),
('Power-Lunch & Lean Dinner Week Plan', 14, 3500, 3220, 8, 7, 'both', 'individual', 0, 11),
('2-Week Power-Lunch & Lean Dinner Plan', 28, 7000, 6300, 10, 14, 'both', 'individual', 0, 12);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_meal_plans_active ON meal_plans(is_active);
CREATE INDEX IF NOT EXISTS idx_meal_plans_type ON meal_plans(meal_type, plan_type);
CREATE INDEX IF NOT EXISTS idx_meal_plans_display_order ON meal_plans(display_order);