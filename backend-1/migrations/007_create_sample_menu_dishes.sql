-- Create sample menu dishes table
CREATE TABLE IF NOT EXISTS sample_menu_dishes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  dish_name TEXT NOT NULL,
  ingredients TEXT NOT NULL, -- JSON array of ingredients
  quantity TEXT NOT NULL,
  calories DECIMAL(10, 2) NOT NULL,
  protein DECIMAL(10, 2) NOT NULL,
  carbs DECIMAL(10, 2) NOT NULL,
  fat DECIMAL(10, 2) NOT NULL,
  sugar DECIMAL(10, 2) NOT NULL,
  fiber DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  is_active BOOLEAN DEFAULT 1,
  display_order INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_by INTEGER,
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_sample_menu_dishes_active ON sample_menu_dishes(is_active);
CREATE INDEX IF NOT EXISTS idx_sample_menu_dishes_display_order ON sample_menu_dishes(display_order);

-- Insert sample data (optional, can be removed in production)
INSERT INTO sample_menu_dishes (dish_name, ingredients, quantity, calories, protein, carbs, fat, sugar, fiber) VALUES
('Grilled Chicken Bowl', '["Chicken breast", "Brown rice", "Broccoli", "Bell peppers", "Olive oil"]', '350g', 450, 45, 35, 12, 4, 6),
('Quinoa Salad', '["Quinoa", "Chickpeas", "Cucumber", "Tomatoes", "Feta cheese", "Lemon dressing"]', '300g', 380, 18, 52, 14, 8, 9),
('Salmon Teriyaki', '["Atlantic salmon", "Teriyaki sauce", "Jasmine rice", "Asparagus", "Sesame seeds"]', '400g', 520, 38, 48, 18, 12, 4);