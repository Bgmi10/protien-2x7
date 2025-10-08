export const sendOrderConfirmation = async (
  customerEmail: string,
  customerName: string,
  orderId: string,
  amount: number,
  mealPlanName: string,
  brevoApiKey: string,
  brevoSenderEmail: string
) => {
  try {
    const emailPayload = {
      sender: {
        name: 'Protein2x7 Shop',
        email: brevoSenderEmail,
      },
      to: [{ email: customerEmail, name: customerName }],
      subject: 'Subscription Confirmation - Protein2x7 Shop',
      htmlContent: `
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #4F46E5;">Thank you for your subscription!</h2>
              <p>Hi <strong>${customerName}</strong>,</p>
              <p>Your subscription has been confirmed successfully and payment has been processed.</p>
              
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #4F46E5; margin-top: 0;">Subscription Details:</h3>
                <p><strong>Order ID:</strong> ${orderId}</p>
                <p><strong>Amount Paid:</strong> ₹${amount / 100}</p>
                <p><strong>Meal Plan:</strong> ${mealPlanName}</p>
              </div>
              
              <p>Your meal plan will be activated within 1-2 business days. You will receive meal delivery information once your subscription is active.</p>
              
              <p>Thank you for choosing <strong>Protein2x7</strong>!</p>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #666;">
                <p>Best regards,<br>Protein2x7 Team</p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': brevoApiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailPayload)
    });

    if (!response.ok) {
      throw new Error(`Email API error: ${response.status}`);
    }

    return { success: true };
  } catch (error: any) {
    console.error('Email sending failed:', error.message);
    return { success: false, error: error.message };
  }
};