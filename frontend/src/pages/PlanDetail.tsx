import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import CheckoutForm from '../components/CheckoutForm';
import { mealPlansApi } from '../services/api';
import type { Plan } from '../types';

export default function PlanDetail() {
  const { planId } = useParams();
  const [showCheckout, setShowCheckout] = useState(false);
  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlanDetails = async () => {
      try {
        setLoading(true);
        
        const res = await mealPlansApi.getById(planId);
        if (res.success) {
          setPlan(res.data);
        }
      } catch (e) {
        console.error('Error fetching plan:', e);
      } finally {
        setLoading(false);
      }
    }

    if (planId) {
      fetchPlanDetails();
    }
  }, [planId])

  if (!planId || loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          {!planId ? (
            <>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Plan Not Found</h1>
              <p className="text-gray-600">The subscription plan you're looking for doesn't exist.</p>
            </>
          ) : (
            <>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading plan details...</p>
            </>
          )}
        </div>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Plan Not Found</h1>
          <p className="text-gray-600">Unable to load plan details.</p>
        </div>
      </div>
    );
  }


  const handleSubscribe = () => {
    setShowCheckout(true);
  };

  return (
    <div className="pt-16 pb-8 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-20">
          {/* Plan Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-lg shadow-sm p-5">
              <div className='flex gap-5 mb-2'>
              {plan.image_url && (
                <div className="lg:w-1/3">
                  <img
                    src={plan.image_url}
                    alt={plan.name}
                    className="w-full h-48 lg:h-40 object-cover rounded-lg"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
              
              <div className="lg:w-2/3">
                <h1 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h1>
                <p className="text-sm text-blue-600 font-medium mb-3">
                  {plan.number_of_meals} {plan.meal_type} meals • {plan.duration_days} days
                </p>
                {plan.description && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {plan.description}
                  </p>
                )}
                {plan.discount_percent > 0 && (
                  <div className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 rounded-md text-xs font-medium">
                    Save {plan.discount_percent}% • Was ₹{plan.original_cost}, Now ₹{plan.discounted_price}
                  </div>
                )}
              </div>
              </div>
              <div className="pt-4">
                <h3 className="text-base font-semibold text-gray-900 mb-3">Plan Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-600">Meal Type:</span>
                    <span className="text-gray-900 font-medium">{plan.meal_type.charAt(0).toUpperCase() + plan.meal_type.slice(1)}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-600">Duration:</span>
                    <span className="text-gray-900 font-medium">{plan.duration_days} Days</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-600">Total Meals:</span>
                    <span className="text-gray-900 font-medium">{plan.number_of_meals}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-600">Per Meal:</span>
                    <span className="text-gray-900 font-medium">₹{Math.round(plan.discounted_price / plan.number_of_meals)}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Pricing Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-lg shadow-sm p-5 sticky top-20">
              <div className="text-center mb-4">
                {plan.discount_percent > 0 && (
                  <div className="text-xs text-gray-500 line-through mb-1">
                    ₹{plan.original_cost}
                  </div>
                )}
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  ₹{plan.discounted_price}
                </div>
                <div className="text-xs text-gray-600 mb-2">
                  Total for {plan.duration_days} days
                </div>
                {plan.discount_percent > 0 && (
                  <div className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 rounded-md text-xs font-medium">
                    {plan.discount_percent}% OFF
                  </div>
                )}
              </div>

              <div className="space-y-2 mb-4 border-t pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Duration:</span>
                  <span className="text-xs font-medium">{plan.duration_days} Days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Meals:</span>
                  <span className="text-xs font-medium">{plan.number_of_meals}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Per Meal:</span>
                  <span className="text-xs font-medium">₹{Math.round(plan.discounted_price / plan.number_of_meals)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Delivery:</span>
                  <span className="text-xs text-green-600 font-medium">FREE</span>
                </div>
              </div>

              <button
                onClick={handleSubscribe}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-md font-medium text-sm transition-colors duration-200"
              >
                Subscribe Now
              </button>

              <p className="text-xs text-gray-500 text-center mt-2">
                Cancel anytime
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {showCheckout && (
        <CheckoutForm
          product={{
            //@ts-ignore
            id: plan.id,
            name: plan.name,
            price: plan.discounted_price,
            image: plan.image_url,
            description: `${plan.number_of_meals} ${plan.meal_type} meals for ${plan.duration_days} days`,
            weight: 'Subscription Plan'
          }}
          onClose={() => setShowCheckout(false)}
        />
      )}
    </div>
  );
}