import axios from 'axios';
import { baseUrl } from './config/config';

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface CreateOrderRequest { 
  amount: number;
  currency?: string;
  receipt?: string;
  customerEmail?: string;
  customerName?: string;
  products?: string[];
}

export interface CreateOrderResponse {
  success: boolean;
  order_id: string;
  amount: number;
  currency: string;
  key_id: string;
}

export const createOrder = async (orderData: CreateOrderRequest): Promise<CreateOrderResponse> => {
  const response = await api.post('/api/v1/create-order', orderData);
  return response.data;
};

export const processPayment = async (paymentData: any) => {
  const response = await api.post('/webhook', paymentData);
  return response.data;
};