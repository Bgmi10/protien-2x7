-- Seed admin user
-- Email: admin@protein2x7.com
-- Password: Admin@2024! (bcrypt hash)

INSERT OR IGNORE INTO users (
  name,
  email,
  password_hash,
  phone,
  role,
  is_active,
  email_verified
) VALUES (
  'Admin User',
  'admin@protein2x7.com',
  '$2a$10$lYYIdIko/5CpuSRzFCilW.czrkWkDECtk45c7i2egojR3DDmLsqSS', -- bcrypt hash for Admin@2024!
  '+919999999999',
  'admin',
  1,
  1
);