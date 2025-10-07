export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  phone: string;
  last_login: string;
  created_at: string;
}

export interface Plan  {
  id: number;
  name: string;
  number_of_meals: number;
  original_cost: number;
  discounted_price: number;
  discount_percent: number;
  duration_days: number;
  meal_type: string;
  plan_type: string;
  is_trial: number;
  is_active: number;
  display_order: number;
  description: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  image_url: string;
}