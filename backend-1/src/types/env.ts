export interface Env {
  // D1 Database binding
  DB: D1Database;
  
  // Environment variables
  ENVIRONMENT: 'development' | 'production';
  API_VERSION: string;
  
  // JWT Secret
  JWT_SECRET: string;
  
  // Razorpay credentials
  RAZORPAY_KEY_ID: string;
  RAZORPAY_KEY_SECRET: string;
  
  // Optional: KV namespace for caching
  // CACHE?: KVNamespace;
  
  // Optional: R2 bucket for file storage
  // STORAGE?: R2Bucket;
}