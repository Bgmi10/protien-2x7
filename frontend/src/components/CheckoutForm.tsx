import { useState } from 'react';
import { createOrder } from '../api';
import { baseUrl } from '../config/config';
import { type Product } from '../utils/constants';

interface CheckoutFormProps {
  product: Product;
  onClose: () => void;
}

interface CustomerDetails {
  email: string;
  name: string;
  phone: string;
  address: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutForm({ product, onClose }: CheckoutFormProps) {
  const [loading, setLoading] = useState(false);
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    email: '',
    name: '',
    phone: '',
    address: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomerDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create order with customer details
      const orderData = await createOrder({
        amount: product.price,
        currency: 'INR',
        receipt: `receipt_${product.id}_${Date.now()}`,
        customerEmail: customerDetails.email,
        customerName: customerDetails.name,
        products: [product.name]
      });

      const options = {
        key: orderData.key_id,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'protein2x7',
        description: `Subscription: ${product.name}`,
        order_id: orderData.order_id,
        handler: async function (response: any) {
          // Payment successful - verify and send email
          try {
            await fetch(baseUrl + '/api/v1/verify-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(response)
            });
            alert('Subscription activated! You will receive an email confirmation shortly.');
            onClose();
          } catch (error) {
            console.error('Payment verification failed:', error);
            alert('Payment successful but email notification failed. Please contact support.');
            onClose();
          }
        },
        prefill: {
          name: customerDetails.name,
          email: customerDetails.email,
          contact: customerDetails.phone
        },
        theme: {
          color: '#4F46E5'
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Subscription setup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-2 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-sm w-full max-h-[95vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900">Complete Your Subscription</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ✕
          </button>
        </div>

        <div className="p-4 space-y-3">
          {/* Subscription Summary */}
          <div className="bg-gray-50 p-3 rounded-lg">
            <h3 className="font-semibold text-gray-900 text-sm">Selected Plan: {product.name}</h3>
            <p className="text-xs text-gray-600">{product.description}</p>
            <p className="text-xl font-bold text-blue-600">₹{product.price}</p>
          </div>

          {/* Customer Details Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={customerDetails.email}
                  onChange={handleInputChange}
                  className="w-full px-2 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={customerDetails.name}
                  onChange={handleInputChange}
                  className="w-full px-2 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={customerDetails.phone}
                  onChange={handleInputChange}
                  className="w-full px-2 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="+91 9999999999"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Address *
                </label>
                <textarea
                  name="address"
                  required
                  value={customerDetails.address}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-2 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Delivery address"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 px-3 py-2 text-sm rounded font-medium ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {loading ? 'Processing...' : 'Start Subscription'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}