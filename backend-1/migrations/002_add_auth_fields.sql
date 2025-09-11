-- Add authentication and role fields to users table

-- Add role column if it doesn't exist
ALTER TABLE users ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user' CHECK(role IN ('user', 'admin'));

-- Add is_active column for account status
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT 1;

-- Add last_login column
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_login DATETIME;

-- Add email_verified column
ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT 0;

-- Add refresh token column for JWT refresh
ALTER TABLE users ADD COLUMN IF NOT EXISTS refresh_token TEXT;

-- Create sessions table for managing user sessions
CREATE TABLE IF NOT EXISTS sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  token TEXT UNIQUE NOT NULL,
  expires_at DATETIME NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create index for sessions
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token);
CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expires_at);