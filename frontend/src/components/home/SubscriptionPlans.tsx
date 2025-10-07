import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowRight, Check, Star, BookOpen } from 'lucide-react';
import { mealPlansApi } from '../../services/api';
import SampleMenuModal from '../SampleMenuModal';
import type { Plan } from '../../types';

export default function SubscriptionPlans() {
  const [showSampleMenu, setShowSampleMenu] = useState(false);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  
  const colorMap = {
    0: 'from-blue-500 to-blue-700',
    1: 'from-green-500 to-green-700', 
    2: 'from-red-500 to-red-700',
    3: 'from-purple-500 to-purple-700',
  };

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const response = await mealPlansApi.getAll();
        if (response.success) {
          setPlans(response.data.slice(0, 4)); // Show first 4 plans
        }
      } catch (error) {
        console.error('Error fetching plans:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  return (
    <section className="py-8 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-6 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-3 lg:mb-4">
            Choose Your Perfect
            <span className="block bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Subscription Plan
            </span>
          </h2>
          <p className="text-sm sm:text-lg lg:text-xl text-gray-600 max-w-xs sm:max-w-2xl lg:max-w-3xl mx-auto px-2">
            Expertly crafted supplement combinations designed for your specific fitness goals
          </p>
          <button
            onClick={() => setShowSampleMenu(true)}
            className="mt-4 inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 transform hover:scale-105"
          >
            <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>View Sample Menu</span>
          </button>
        </motion.div>

        {/* Plans Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8 mb-6 sm:mb-10 lg:mb-12">
            {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="bg-white rounded-lg sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full">
                {/* Plan Image */}
                <div className="relative h-20 sm:h-32 lg:h-40 overflow-hidden">
                  {plan.image_url ? (
                    <img
                      src={plan.image_url}
                      alt={plan.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : null}
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center" style={{display: plan.image_url ? 'none' : 'flex'}}>
                    <div className="text-2xl sm:text-3xl lg:text-4xl">🍽️</div>
                  </div>
                  <div className={`absolute inset-0 bg-gradient-to-t ${
                    //@ts-ignore
                    colorMap[index % 4]} opacity-75`}></div>
                  
                  {/* Most Popular Badge */}
                  {index === 0 && (
                    <div className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-yellow-500 text-white px-1 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs font-semibold flex items-center space-x-0.5">
                      <Star className="h-2 w-2 sm:h-3 sm:w-3" fill="currentColor" />
                      <span className="hidden sm:inline text-xs">Popular</span>
                      <span className="sm:hidden">★</span>
                    </div>
                  )}

                  {/* Plan Title */}
                  <div className="absolute bottom-1 left-1 sm:bottom-2 sm:left-2 text-white">
                    <h3 className="text-xs sm:text-sm lg:text-base font-bold leading-tight">{plan.name}</h3>
                    <p className="text-xs opacity-90 leading-tight">{plan.number_of_meals} meals • {plan.duration_days} days</p>
                  </div>
                </div>

                {/* Plan Content */}
                <div className="p-2 sm:p-3">
                  {plan.description && (
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">{plan.description}</p>
                  )}

                  {/* Pricing */}
                  <div className="mb-2">
                    <div className="flex items-baseline space-x-1">
                      {plan.discount_percent > 0 && (
                        <span className="text-xs text-gray-400 line-through">
                          ₹{plan.original_cost}
                        </span>
                      )}
                      <span className="text-lg sm:text-xl font-bold text-gray-900">
                        ₹{plan.discounted_price}
                      </span>
                    </div>
                    <p className="text-xs text-green-600 font-medium">
                      {plan.discount_percent > 0 ? `${plan.discount_percent}% OFF` : 'Best Value'}
                    </p>
                  </div>

                  {/* Benefits */}
                  <div className="mb-2">
                    <div className="flex items-center space-x-1 mb-1">
                      <Check className="h-3 w-3 text-green-500 flex-shrink-0" />
                      <span className="text-xs text-gray-700">{plan.number_of_meals} {plan.meal_type} meals</span>
                    </div>
                    <div className="flex items-center space-x-1 mb-1">
                      <Check className="h-3 w-3 text-green-500 flex-shrink-0" />
                      <span className="text-xs text-gray-700">{plan.duration_days} days duration</span>
                    </div>
                    <div className="flex items-center space-x-1 mb-1">
                      <Check className="h-3 w-3 text-green-500 flex-shrink-0" />
                      <span className="text-xs text-gray-700">Free delivery</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link
                    to={`/subscription-plans/${plan.id}`}
                    className={`w-full bg-gradient-to-r ${
                      //@ts-ignore
                      colorMap[index % 4]} text-white py-2 rounded-md font-semibold flex items-center justify-center space-x-1 hover:shadow-lg transition-all duration-300 group`}
                  >
                    <span className="text-xs">View Details</span>
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
            ))}
          </div>
        )}

        {/* View All Plans CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            to="/subscription-plans"
            className="inline-flex items-center space-x-1 sm:space-x-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 rounded-full font-bold text-sm sm:text-base lg:text-lg transition-all duration-300 transform hover:scale-105"
          >
            <span>Compare All Plans</span>
            <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
          </Link>
        </motion.div>
      </div>
      
      {/* Sample Menu Modal */}
      <SampleMenuModal isOpen={showSampleMenu} onClose={() => setShowSampleMenu(false)} />
    </section>
  );
}