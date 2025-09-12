-- Add role column
ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'user' CHECK(role IN ('user', 'admin'));

-- Add is_active column
ALTER TABLE users ADD COLUMN is_active BOOLEAN DEFAULT 1;

-- Add last_login column
ALTER TABLE users ADD COLUMN last_login DATETIME;

-- Add email_verified column
ALTER TABLE users ADD COLUMN email_verified BOOLEAN DEFAULT 0;

-- Add refresh token column
ALTER TABLE users ADD COLUMN refresh_token TEXT;

-- Create sessions table
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
