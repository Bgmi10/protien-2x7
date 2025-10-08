-- Update orders table for better payment integration
-- Add customer details and meal plan tracking

ALTER TABLE orders ADD COLUMN customer_email TEXT;
ALTER TABLE orders ADD COLUMN customer_name TEXT;
ALTER TABLE orders ADD COLUMN customer_phone TEXT;
ALTER TABLE orders ADD COLUMN meal_plan_id INTEGER REFERENCES meal_plans(id);
ALTER TABLE orders ADD COLUMN meal_plan_name TEXT;

-- Update payment status enum to include 'processing' state
-- Note: SQLite doesn't support modifying CHECK constraints, so we'll handle this in application code

-- Add index for better query performance on payment tracking
CREATE INDEX IF NOT EXISTS idx_orders_razorpay_order_id ON orders(razorpay_order_id);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);