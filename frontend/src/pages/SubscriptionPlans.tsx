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
    <div className="pt-20 pb-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
            Choose Your Perfect
            <span className="block bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Subscription Plan
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            Our expertly crafted supplement combinations are designed to help you achieve your specific fitness goals. 
            Each plan includes premium products, flexible delivery, and expert guidance.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Check className="h-5 w-5 text-green-500" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="h-5 w-5 text-green-500" />
              <span>Free delivery</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="h-5 w-5 text-green-500" />
              <span>Expert support</span>
            </div>
          </div>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {subscriptionPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 relative"
            >
              {index === 0 && (
                <div className="absolute top-6 right-6 z-10">
                  <div className="bg-yellow-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center space-x-1">
                    <Star className="h-4 w-4" fill="currentColor" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 h-full">
                {/* Left Side - Image */}
                <div className="relative h-64 md:h-auto">
                  <img
                    src={plan.image}
                    alt={plan.name}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${colorMap[plan.color as keyof typeof colorMap]} opacity-80`}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white p-6">
                      <h2 className="text-3xl font-bold mb-2">{plan.name}</h2>
                      <p className="text-lg opacity-90">{plan.tagline}</p>
                    </div>
                  </div>
                </div>

                {/* Right Side - Content */}
                <div className="p-8 flex flex-col justify-between">
                  <div>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {plan.description}
                    </p>

                    {/* Pricing */}
                    <div className="mb-6">
                      <div className="flex items-baseline space-x-2 mb-2">
                        <span className="text-4xl font-bold text-gray-900">
                          ₹{plan.pricing.monthly}
                        </span>
                        <span className="text-gray-500">/month</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-gray-600">
                          <span className="font-medium">3 months:</span> ₹{plan.pricing.quarterly}/mo
                        </div>
                        <div className="text-gray-600">
                          <span className="font-medium">6 months:</span> ₹{plan.pricing.halfYearly}/mo
                        </div>
                      </div>
                      <p className="text-sm text-green-600 font-medium mt-1">
                        Save up to 20% on longer plans
                      </p>
                    </div>

                    {/* Benefits */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">What you get:</h4>
                      {plan.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-start space-x-3 mb-2">
                          <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>

                    {/* Products Included */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Products included:</h4>
                      <div className="flex flex-wrap gap-2">
                        {plan.products.map((product, i) => (
                          <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                            {product}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link
                    to={`/subscription-plans/${plan.id}`}
                    className={`w-full bg-gradient-to-r ${colorMap[plan.color as keyof typeof colorMap]} text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center space-x-2 hover:shadow-lg transition-all duration-300 group`}
                  >
                    <span>Get Started</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
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
          className="mt-20 text-center"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Have Questions?
          </h3>
          <p className="text-lg text-gray-600 mb-8">
            Our fitness experts are here to help you choose the perfect plan
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/faq"
              className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              View FAQ
            </Link>
            <Link
              to="/contact"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Talk to Expert
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}