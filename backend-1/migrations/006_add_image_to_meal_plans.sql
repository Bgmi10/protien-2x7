-- Add image_url column to meal_plans table
ALTER TABLE meal_plans ADD COLUMN image_url TEXT;

-- Add placeholder images for existing meal plans (you can update these later)
UPDATE meal_plans SET image_url = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c' WHERE id = 1;
UPDATE meal_plans SET image_url = 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445' WHERE id = 2;
UPDATE meal_plans SET image_url = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38' WHERE id = 3;
UPDATE meal_plans SET image_url = 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1' WHERE id = 4;
UPDATE meal_plans SET image_url = 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe' WHERE id = 5;
UPDATE meal_plans SET image_url = 'https://images.unsplash.com/photo-1565299507177-b0ac66763828' WHERE id = 6;
UPDATE meal_plans SET image_url = 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543' WHERE id = 7;
UPDATE meal_plans SET image_url = 'https://images.unsplash.com/photo-1484723091739-30a097e8f929' WHERE id = 8;
UPDATE meal_plans SET image_url = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836' WHERE id = 9;
UPDATE meal_plans SET image_url = 'https://images.unsplash.com/photo-1493770348161-369560ae357d' WHERE id = 10;
UPDATE meal_plans SET image_url = 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327' WHERE id = 11;
UPDATE meal_plans SET image_url = 'https://images.unsplash.com/photo-1547592577-85ac7e6e26d1' WHERE id = 12;