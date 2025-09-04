import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Star, ArrowRight } from 'lucide-react';
import { subscriptionPlans } from '../utils/constants';
import CheckoutForm from '../components/CheckoutForm';

export default function PlanDetail() {
  const { planId } = useParams();
  const [selectedDuration, setSelectedDuration] = useState<'monthly' | 'quarterly' | 'halfYearly'>('monthly');
  const [showCheckout, setShowCheckout] = useState(false);

  const plan = subscriptionPlans.find(p => p.id === planId);

  if (!plan) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Plan Not Found</h1>
          <p className="text-gray-600">The subscription plan you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const durationOptions = [
    { key: 'monthly', label: '1 Month', price: plan.pricing.monthly, savings: 0 },
    { key: 'quarterly', label: '3 Months', price: plan.pricing.quarterly, savings: 15 },
    { key: 'halfYearly', label: '6 Months', price: plan.pricing.halfYearly, savings: 20 },
  ];

  const selectedPrice = plan.pricing[selectedDuration];

  const handleSubscribe = () => {
    setShowCheckout(true);
  };

  return (
    <div className="pt-20 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-4">
            {plan.name}
          </h1>
          <p className="text-2xl text-blue-600 font-semibold mb-6">
            {plan.tagline}
          </p>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {plan.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Plan Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Plan Benefits</h2>
              
              <div className="space-y-4 mb-8">
                {plan.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Check className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-lg">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Products Included</h3>
                <div className="grid grid-cols-1 gap-3">
                  {plan.products.map((product, index) => (
                    <div key={index} className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="font-medium text-gray-900">{product}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Pricing & Checkout */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Duration</h2>
              
              <div className="space-y-3 mb-8">
                {durationOptions.map((option) => (
                  <label
                    key={option.key}
                    className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedDuration === option.key
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="duration"
                        value={option.key}
                        checked={selectedDuration === option.key}
                        onChange={(e) => setSelectedDuration(e.target.value as any)}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <div>
                        <div className="font-semibold text-gray-900">{option.label}</div>
                        {option.savings > 0 && (
                          <div className="text-sm text-green-600 font-medium">
                            Save {option.savings}%
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        ₹{option.price}
                      </div>
                      <div className="text-sm text-gray-500">/month</div>
                    </div>
                  </label>
                ))}
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Monthly Price:</span>
                  <span className="font-semibold">₹{selectedPrice}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Delivery:</span>
                  <span className="text-green-600 font-semibold">FREE</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-900">Total per month:</span>
                    <span className="text-2xl font-bold text-blue-600">₹{selectedPrice}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSubscribe}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 rounded-lg font-bold text-lg flex items-center justify-center space-x-2 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <span>Start Subscription</span>
                <ArrowRight className="h-5 w-5" />
              </button>

              <p className="text-sm text-gray-500 text-center mt-4">
                Cancel anytime • Free delivery • Expert support
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {showCheckout && (
        <CheckoutForm
          product={{
            id: plan.id,
            name: `${plan.name} - ${durationOptions.find(o => o.key === selectedDuration)?.label}`,
            price: selectedPrice,
            image: plan.image,
            description: plan.description,
            weight: 'Subscription Plan'
          }}
          onClose={() => setShowCheckout(false)}
        />
      )}
    </div>
  );
}