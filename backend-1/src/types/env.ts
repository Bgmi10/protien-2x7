export interface Env {
  // D1 Database binding
  DB: any; // D1Database from Cloudflare Workers
  
  // R2 bucket binding
  bucket_name?: R2Bucket; // R2 binding from dashboard/wrangler
  
  // Environment variables
  ENVIRONMENT: 'development' | 'production';
  API_VERSION: string;
  R2_PUBLIC_URL?: string;
  
  // JWT Secret
  JWT_SECRET: string;
  
  // Razorpay credentials
  RAZORPAY_KEY_ID?: string;
  RAZORPAY_KEY_SECRET?: string;
  
  // Optional: KV namespace for caching
  // CACHE?: KVNamespace;
}