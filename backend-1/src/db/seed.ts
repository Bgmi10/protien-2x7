import bcrypt from 'bcryptjs';
import { Env } from '../types/env';

/**
 * Seed script to create default admin user
 * Run this script to initialize the admin account
 */

const ADMIN_CREDENTIALS = {
  email: 'admin@protein2x7.com',
  phone: '9001933588',
  name: 'Admin',
  password: 'Admin@2024!', // Change this in production
  role: 'admin'
};

export async function seedAdmin(env: Env) {
  try {
    // Check if admin already exists
    const existingAdmin = await env.DB.prepare(
      'SELECT id FROM users WHERE email = ? OR role = ?'
    ).bind(ADMIN_CREDENTIALS.email, 'admin').first();

    if (existingAdmin) {
      console.log('Admin user already exists');
      return { success: true, message: 'Admin already exists' };
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(ADMIN_CREDENTIALS.password, 12);

    // Create admin user
    const result = await env.DB.prepare(
      `INSERT INTO users (email, phone, name, password_hash, role, is_active, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`
    ).bind(
      ADMIN_CREDENTIALS.email,
      ADMIN_CREDENTIALS.phone,
      ADMIN_CREDENTIALS.name,
      passwordHash,
      ADMIN_CREDENTIALS.role
    ).run();

    console.log('Admin user created successfully');
    return { 
      success: true, 
      message: 'Admin user created',
      adminId: result.meta.last_row_id 
    };
  } catch (error) {
    console.error('Error seeding admin:', error);
    throw new Error(`Failed to seed admin: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Function to run all seeds
export async function runSeeds(env: Env) {
  console.log('Running database seeds...');
  
  try {
    // Seed admin user
    await seedAdmin(env);
    
    // Add more seed functions here as needed
    
    console.log('All seeds completed successfully');
    return { success: true };
  } catch (error) {
    console.error('Seed failed:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}