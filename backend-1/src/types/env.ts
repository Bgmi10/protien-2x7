export interface Env {
  DB: any;
  bucket_name?: R2Bucket; 
  ENVIRONMENT: 'development' | 'production';
  API_VERSION: string;
  R2_PUBLIC_URL?: string;
  BREVO_API_KEY: string;
  BREVO_SENDER_EMAIL: string
  JWT_SECRET: string;
  RAZORPAY_KEY_ID?: string;
  RAZORPAY_KEY_SECRET?: string;
  RAZORPAY_WEBHOOK_SECRET: string;
}