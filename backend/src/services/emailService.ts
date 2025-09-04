import axios from 'axios';

export const sendOrderConfirmation = async (
  customerEmail: string,
  customerName: string,
  orderId: string,
  amount: number,
  products: string[]
) => {
  try {
    const emailPayload = {
      sender: {
        name: 'Protein2x4 Shop',
        email: process.env.BREVO_SENDER_EMAIL,
      },
      to: [{ email: customerEmail, name: customerName }],
      subject: 'Order Confirmation - Protein2x4 Shop',
      htmlContent: `
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #4F46E5;">Thank you for your order!</h2>
              <p>Hi <strong>${customerName}</strong>,</p>
              <p>Your order has been confirmed successfully and payment has been processed.</p>
              
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #4F46E5; margin-top: 0;">Order Details:</h3>
                <p><strong>Order ID:</strong> ${orderId}</p>
                <p><strong>Amount Paid:</strong> ₹${amount / 100}</p>
                <p><strong>Products:</strong> ${products.join(", ")}</p>
              </div>
              
              <p>Your order will be processed within 1-2 business days. You will receive tracking information once your order is shipped.</p>
              
              <p>Thank you for choosing <strong>Protein2x4</strong>!</p>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #666;">
                <p>Best regards,<br>Protein2x4 Team</p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      emailPayload,
      {
        headers: {
          'api-key': process.env.BREVO_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );

    return { success: true };
  } catch (error: any) {
    console.error('Email sending failed:', error.response?.data || error.message);
    return { success: false, error: error.response?.data || error.message };
  }
};