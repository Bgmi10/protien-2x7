import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import crypto from "crypto";
//@ts-ignore
import Razorpay from "razorpay";
import { sendOrderConfirmation } from "./services/emailService";

dotenv.config({ path: "./.env" });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.raw({ type: "application/json" }));

const razorpay = new Razorpay({
  key_id: process.env.RAZOR_PAY_KEY_ID!,
  key_secret: process.env.RAZOR_PAY_KEY_SECRET!,
});

// Store order details temporarily
const orderDetails = new Map();

app.post("/api/v1/create-order", async (req, res) => {
  try {
    const { amount, currency = "INR", receipt, customerEmail, customerName, products } = req.body;
    
    const options = {
      amount: amount * 100, // Convert to paise
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    
    // Store customer details for webhook
    orderDetails.set(order.id, {
      customerEmail,
      customerName,
      amount: order.amount,
      products
    });
    
    res.json({
      success: true,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: process.env.RAZOR_PAY_KEY_ID,
    });
  } catch (error) {
    console.error("Order creation failed:", error);
    res.status(500).json({ success: false, error: "Order creation failed" });
  }
});

app.post("/api/v1/webhook", async (req, res) => {
  console.log("Webhook received:", req.body)
  try {
    // Verify webhook signature for security
    const body = JSON.stringify(req.body);
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZOR_PAY_WEBHOOK_SECRET!)
      .update(body)
      .digest('hex');

    const signature = req.headers['x-razorpay-signature'];
    
    if (expectedSignature !== signature) {
      console.log("Invalid webhook signature")
      return res.status(400).json({ success: false, error: 'Invalid signature' });
    }
    
    const { razorpay_payment_id, razorpay_order_id } = req.body;
    
    // Get stored order details
    const storedDetails = orderDetails.get(razorpay_order_id);
    
    if (!storedDetails) {
      return res.status(404).json({ success: false, error: 'Order details not found' });
    }
    
    console.log(`Payment successful: ${razorpay_payment_id} for order: ${razorpay_order_id}`);
    
    // Send order confirmation email
    await sendOrderConfirmation(
      storedDetails.customerEmail,
      storedDetails.customerName,
      razorpay_order_id,
      storedDetails.amount,
      storedDetails.products || []
    );
    
    // Clean up stored details
    orderDetails.delete(razorpay_order_id);
    
    res.json({ success: true, message: "Payment processed" });
  } catch (error) {
    console.error("Webhook error:", error)
    res.status(500).json({ success: false, error: "Webhook processing failed" });
  }
});

// Payment verification endpoint for frontend
app.post("/api/v1/verify-payment", async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
    
    console.log("Payment verification:", { razorpay_payment_id, razorpay_order_id });
    
    // Get stored order details
    const storedDetails = orderDetails.get(razorpay_order_id);
    
    if (!storedDetails) {
      return res.status(404).json({ success: false, error: 'Order details not found' });
    }
    
    // Send order confirmation email
    await sendOrderConfirmation(
      storedDetails.customerEmail,
      storedDetails.customerName,
      razorpay_order_id,
      storedDetails.amount,
      storedDetails.products || []
    );
    
    // Clean up stored details
    orderDetails.delete(razorpay_order_id);
    
    res.json({ success: true, message: "Payment verified and email sent" });
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({ success: false, error: "Payment verification failed" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});