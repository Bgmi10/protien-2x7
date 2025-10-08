import { Hono } from "hono";
import { Env } from '../types/env';
import Razorpay from "razorpay";
import { sendOrderConfirmation } from '../services/emailService';

export const order = new Hono<{ Bindings: Env }>();

order.post("/create-order", async (c) => {  
  const razorpay = new Razorpay({
    key_id: c.env.RAZORPAY_KEY_ID!,
    key_secret: c.env.RAZORPAY_KEY_SECRET!,
  });
  
  try {
    const { receipt, customerEmail, customerName, mealPlanId, customerPhone, deliveryAddress } = await c.req.json();
    
    // Fetch meal plan details from database
    const mealPlanQuery = await c.env.DB.prepare(
      'SELECT * FROM meal_plans WHERE id = ? AND is_active = 1'
    ).bind(mealPlanId).first();
    
    if (!mealPlanQuery) {
      return c.json({ success: false, error: "Meal plan not found" }, 404);
    }
    
    const mealPlan = mealPlanQuery;
    const amount = mealPlan.discounted_price;
    
    const options = {
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: receipt || `receipt_${Date.now()}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);
    
    // Create or get user with customer details
    let user = await c.env.DB.prepare(
      'SELECT id FROM users WHERE email = ?'
    ).bind(customerEmail).first();

    if (!user) {
      await c.env.DB.prepare(
        `INSERT INTO users (name, email, password_hash, phone, role, is_active, email_verified) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`
      ).bind(
        customerName,
        customerEmail, 
        '$2a$10$randompassword.hash.temporary.user',
        customerPhone || '+919999999999',
        'user',
        1,
        0
      ).run();
      
      user = await c.env.DB.prepare(
        'SELECT id FROM users WHERE email = ?'
      ).bind(customerEmail).first();
    }

    // Save order to database
    const orderNumber = `ORD-${Date.now()}`;
    await c.env.DB.prepare(
      `INSERT INTO orders (
        user_id, order_number, total_amount, status, payment_status, 
        razorpay_order_id, customer_email, customer_name, customer_phone,
        meal_plan_id, meal_plan_name, delivery_address,
        delivery_date, delivery_time_slot
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      user.id,
      orderNumber,
      amount,
      'pending',
      'pending',
      razorpayOrder.id,
      customerEmail,
      customerName,
      customerPhone || '',
      mealPlanId,
      mealPlan.name,
      deliveryAddress || '',
      new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Tomorrow
      'morning'
    ).run();
    
    return c.json({
      success: true,
      order_id: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key_id: c.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Order creation failed:", error);
    return c.json({ success: false, error: "Order creation failed" }, 500);
  }
});

order.post("/webhook", async (c) => {
  console.log("Webhook received:", await c.req.json());
  try {
    const body = await c.req.text();
    const parsedBody = JSON.parse(body);
    
    // Verify webhook signature for security using Web Crypto API
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(c.env.RAZORPAY_WEBHOOK_SECRET!),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    
    const signatureBytes = await crypto.subtle.sign('HMAC', key, encoder.encode(body));
    const expectedSignature = Array.from(new Uint8Array(signatureBytes))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    const receivedSignature = c.req.header('x-razorpay-signature');
    
    if (expectedSignature !== receivedSignature) {
      console.log("Invalid webhook signature");
      return c.json({ success: false, error: 'Invalid signature' }, 400);
    }
    
    const { razorpay_payment_id, razorpay_order_id } = parsedBody;
    
    // Get order details from database
    const orderDetails = await c.env.DB.prepare(
      'SELECT * FROM orders WHERE razorpay_order_id = ?'
    ).bind(razorpay_order_id).first();
    
    if (!orderDetails) {
      return c.json({ success: false, error: 'Order details not found' }, 404);
    }
    
    console.log(`Payment successful: ${razorpay_payment_id} for order: ${razorpay_order_id}`);
    
    // Update order status in database
    await c.env.DB.prepare(
      'UPDATE orders SET payment_status = ?, razorpay_payment_id = ?, status = ? WHERE razorpay_order_id = ?'
    ).bind('paid', razorpay_payment_id, 'confirmed', razorpay_order_id).run();
    
    // Send order confirmation email
    await sendOrderConfirmation(
      orderDetails.customer_email,
      orderDetails.customer_name,
      razorpay_order_id,
      orderDetails.total_amount * 100, // Convert to paise for email
      orderDetails.meal_plan_name,
      c.env.BREVO_API_KEY,
      c.env.BREVO_SENDER_EMAIL
    );
    
    return c.json({ success: true, message: "Payment processed" });
  } catch (error) {
    console.error("Webhook error:", error);
    return c.json({ success: false, error: "Webhook processing failed" }, 500);
  }
});

order.post("/verify-payment", async (c) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = await c.req.json();
    
    console.log("Payment verification:", { razorpay_payment_id, razorpay_order_id });
    
    // Get order details from database
    const orderDetails = await c.env.DB.prepare(
      'SELECT * FROM orders WHERE razorpay_order_id = ?'
    ).bind(razorpay_order_id).first();
    
    if (!orderDetails) {
      return c.json({ success: false, error: 'Order details not found' }, 404);
    }
    
    // Update order status in database
    await c.env.DB.prepare(
      'UPDATE orders SET payment_status = ?, razorpay_payment_id = ?, status = ? WHERE razorpay_order_id = ?'
    ).bind('paid', razorpay_payment_id, 'confirmed', razorpay_order_id).run();
    
    // Send order confirmation email
    await sendOrderConfirmation(
      orderDetails.customer_email,
      orderDetails.customer_name,
      razorpay_order_id,
      orderDetails.total_amount * 100, // Convert to paise for email
      orderDetails.meal_plan_name,
      c.env.BREVO_API_KEY,
      c.env.BREVO_SENDER_EMAIL
    );
    
    return c.json({ success: true, message: "Payment verified successfully" });
  } catch (error) {
    console.error("Payment verification error:", error);
    return c.json({ success: false, error: "Payment verification failed" }, 500);
  }
});