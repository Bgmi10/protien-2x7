import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Star } from 'lucide-react';
import { subscriptionPlans } from '../../utils/constants';

export default function SubscriptionPlans() {
  const colorMap = {
    blue: 'from-blue-500 to-blue-700',
    green: 'from-green-500 to-green-700',
    red: 'from-red-500 to-red-700',
    purple: 'from-purple-500 to-purple-700',
  };

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
          <h2 className="text-xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-3 lg:mb-4">
            Choose Your Perfect
            <span className="block bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Subscription Plan
            </span>
          </h2>
          <p className="text-[12px] sm:text-lg lg:text-xl text-gray-600 max-w-xs sm:max-w-2xl lg:max-w-3xl mx-auto px-2">
            Expertly crafted supplement combinations designed for your specific fitness goals
          </p>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8 mb-6 sm:mb-10 lg:mb-12">
          {subscriptionPlans.map((plan, index) => (
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
                <div className="relative h-24 sm:h-36 lg:h-48 overflow-hidden">
                  <img
                    src={plan.image}
                    alt={plan.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${colorMap[plan.color as keyof typeof colorMap]} opacity-80`}></div>
                  
                  {/* Most Popular Badge */}
                  {index === 0 && (
                    <div className="absolute top-1 right-1 sm:top-3 sm:right-3 lg:top-4 lg:right-4 bg-yellow-500 text-white px-1 py-0.5 sm:px-2 sm:py-1 lg:px-3 lg:py-1 rounded-full text-[8px] sm:text-xs lg:text-sm font-semibold flex items-center space-x-0.5 sm:space-x-1">
                      <Star className="h-2 w-2 sm:h-3 sm:w-3 lg:h-4 lg:w-4" fill="currentColor" />
                      <span className="hidden sm:inline">Most Popular</span>
                      <span className="sm:hidden">Popular</span>
                    </div>
                  )}

                  {/* Plan Title */}
                  <div className="absolute bottom-1 left-1 sm:bottom-3 sm:left-3 lg:bottom-4 lg:left-4 text-white">
                    <h3 className="text-[10px] sm:text-base lg:text-xl font-bold">{plan.name}</h3>
                    <p className="text-[8px] sm:text-xs lg:text-sm opacity-90">{plan.tagline}</p>
                  </div>
                </div>

                {/* Plan Content */}
                <div className="p-2 sm:p-4 lg:p-6">
                  <p className="text-[10px] sm:text-sm lg:text-base text-gray-600 mb-2 sm:mb-3 lg:mb-4">{plan.description}</p>

                  {/* Pricing */}
                  <div className="mb-2 sm:mb-3 lg:mb-4">
                    <div className="flex items-baseline space-x-0.5 sm:space-x-1">
                      <span className="text-sm sm:text-2xl lg:text-3xl font-bold text-gray-900">
                        ₹{plan.pricing.monthly}
                      </span>
                      <span className="text-[8px] sm:text-sm lg:text-base text-gray-500">/month</span>
                    </div>
                    <p className="text-[8px] sm:text-xs lg:text-sm text-green-600 font-medium">
                      Save up to 20% on longer plans
                    </p>
                  </div>

                  {/* Benefits */}
                  <div className="mb-3 sm:mb-4 lg:mb-6">
                    {plan.benefits.slice(0, 3).map((benefit, i) => (
                      <div key={i} className="flex items-center space-x-1 sm:space-x-2 mb-1 sm:mb-1.5 lg:mb-2">
                        <Check className="h-2 w-2 sm:h-3 sm:w-3 lg:h-4 lg:w-4 text-green-500 flex-shrink-0" />
                        <span className="text-[8px] sm:text-xs lg:text-sm text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Link
                    to={`/subscription-plans/${plan.id}`}
                    className={`w-full bg-gradient-to-r ${colorMap[plan.color as keyof typeof colorMap]} text-white py-1.5 sm:py-2 lg:py-3 rounded-md sm:rounded-lg font-semibold flex items-center justify-center space-x-1 sm:space-x-2 hover:shadow-lg transition-all duration-300 group`}
                  >
                    <span className="text-[8px] sm:text-sm lg:text-base">View Details</span>
                    <ArrowRight className="h-2 w-2 sm:h-3 sm:w-3 lg:h-4 lg:w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

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
            className="inline-flex items-center space-x-1 sm:space-x-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 rounded-full font-bold text-[10px] sm:text-base lg:text-lg transition-all duration-300 transform hover:scale-105"
          >
            <span>Compare All Plans</span>
            <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}