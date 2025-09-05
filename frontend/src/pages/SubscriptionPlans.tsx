import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Star } from 'lucide-react';
import { subscriptionPlans } from '../utils/constants';

export default function SubscriptionPlans() {
  const colorMap = {
    blue: 'from-blue-500 to-blue-700',
    green: 'from-green-500 to-green-700',
    red: 'from-red-500 to-red-700',
    purple: 'from-purple-500 to-purple-700',
  };

  return (
    <div className="lg:pt-32 sm: pt-20 pb-8 sm:pb-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6 sm:mb-12 lg:mb-16"
        >
          <h1 className="text-xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-6">
            Choose Your Perfect
            <span className="block bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Subscription Plan
            </span>
          </h1>
          <p className="text-[12px] sm:text-lg lg:text-xl text-gray-600 max-w-xs sm:max-w-2xl lg:max-w-4xl mx-auto mb-4 sm:mb-6 lg:mb-8 px-2">
            Our expertly crafted supplement combinations are designed to help you achieve your specific fitness goals. 
            Each plan includes premium products, flexible delivery, and expert guidance.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 lg:space-x-8 text-[10px] sm:text-sm text-gray-600">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <Check className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-green-500" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2">
              <Check className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-green-500" />
              <span>Free delivery</span>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2">
              <Check className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-green-500" />
              <span>Expert support</span>
            </div>
          </div>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {subscriptionPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white rounded-lg sm:rounded-2xl lg:rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 relative"
            >
              {index === 0 && (
                <div className="absolute top-2 right-2 sm:top-4 sm:right-4 lg:top-6 lg:right-6 z-10">
                  <div className="bg-yellow-500 text-white px-2 py-1 sm:px-3 sm:py-1.5 lg:px-4 lg:py-2 rounded-full text-[8px] sm:text-xs lg:text-sm font-bold flex items-center space-x-0.5 sm:space-x-1">
                    <Star className="h-2 w-2 sm:h-3 sm:w-3 lg:h-4 lg:w-4" fill="currentColor" />
                    <span className="hidden sm:inline">Most Popular</span>
                    <span className="sm:hidden">Popular</span>
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 h-full">
                {/* Left Side - Image */}
                <div className="relative h-32 sm:h-48 md:h-auto">
                  <img
                    src={plan.image}
                    alt={plan.name}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${colorMap[plan.color as keyof typeof colorMap]} opacity-80`}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white p-3 sm:p-4 lg:p-6">
                      <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2">{plan.name}</h2>
                      <p className="text-[10px] sm:text-sm lg:text-lg opacity-90">{plan.tagline}</p>
                    </div>
                  </div>
                </div>

                {/* Right Side - Content */}
                <div className="p-4 sm:p-6 lg:p-8 flex flex-col justify-between">
                  <div>
                    <p className="text-[10px] sm:text-sm lg:text-base text-gray-600 mb-3 sm:mb-4 lg:mb-6 leading-relaxed">
                      {plan.description}
                    </p>

                    {/* Pricing */}
                    <div className="mb-3 sm:mb-4 lg:mb-6">
                      <div className="flex items-baseline space-x-1 sm:space-x-2 mb-1 sm:mb-2">
                        <span className="text-xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                          ₹{plan.pricing.monthly}
                        </span>
                        <span className="text-[10px] sm:text-sm lg:text-base text-gray-500">/month</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1 sm:gap-2 text-[8px] sm:text-xs lg:text-sm">
                        <div className="text-gray-600">
                          <span className="font-medium">3 months:</span> ₹{plan.pricing.quarterly}/mo
                        </div>
                        <div className="text-gray-600">
                          <span className="font-medium">6 months:</span> ₹{plan.pricing.halfYearly}/mo
                        </div>
                      </div>
                      <p className="text-[8px] sm:text-xs lg:text-sm text-green-600 font-medium mt-0.5 sm:mt-1">
                        Save up to 20% on longer plans
                      </p>
                    </div>

                    {/* Benefits */}
                    <div className="mb-3 sm:mb-4 lg:mb-6">
                      <h4 className="text-[10px] sm:text-sm lg:text-base font-semibold text-gray-900 mb-2 sm:mb-3">What you get:</h4>
                      {plan.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-start space-x-2 sm:space-x-3 mb-1 sm:mb-1.5 lg:mb-2">
                          <Check className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-[8px] sm:text-xs lg:text-sm text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>

                    {/* Products Included */}
                    <div className="mb-3 sm:mb-4 lg:mb-6">
                      <h4 className="text-[10px] sm:text-sm lg:text-base font-semibold text-gray-900 mb-2 sm:mb-3">Products included:</h4>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {plan.products.map((product, i) => (
                          <span key={i} className="bg-gray-100 text-gray-700 px-2 py-0.5 sm:px-2.5 sm:py-1 lg:px-3 lg:py-1 rounded-full text-[8px] sm:text-xs lg:text-sm">
                            {product}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link
                    to={`/subscription-plans/${plan.id}`}
                    className={`w-full bg-gradient-to-r ${colorMap[plan.color as keyof typeof colorMap]} text-white py-2 sm:py-3 lg:py-4 rounded-lg sm:rounded-xl font-bold text-[10px] sm:text-sm lg:text-lg flex items-center justify-center space-x-1 sm:space-x-2 hover:shadow-lg transition-all duration-300 group`}
                  >
                    <span>Get Started</span>
                    <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 sm:mt-16 lg:mt-20 text-center"
        >
          <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3 lg:mb-4">
            Have Questions?
          </h3>
          <p className="text-[12px] sm:text-base lg:text-lg text-gray-600 mb-4 sm:mb-6 lg:mb-8 px-2">
            Our fitness experts are here to help you choose the perfect plan
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
            <Link
              to="/faq"
              className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 sm:px-6 sm:py-2.5 lg:px-8 lg:py-3 rounded-lg font-semibold text-[10px] sm:text-sm lg:text-base transition-colors"
            >
              View FAQ
            </Link>
            <Link
              to="/contact"
              className="text-blue-600 hover:text-blue-700 font-semibold text-[10px] sm:text-sm lg:text-base"
            >
              Talk to Expert
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}