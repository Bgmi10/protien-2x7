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
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Choose Your Perfect
            <span className="block bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Subscription Plan
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expertly crafted supplement combinations designed for your specific fitness goals
          </p>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {subscriptionPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full">
                {/* Plan Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={plan.image}
                    alt={plan.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${colorMap[plan.color as keyof typeof colorMap]} opacity-80`}></div>
                  
                  {/* Most Popular Badge */}
                  {index === 0 && (
                    <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                      <Star className="h-4 w-4" fill="currentColor" />
                      <span>Most Popular</span>
                    </div>
                  )}

                  {/* Plan Title */}
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <p className="text-sm opacity-90">{plan.tagline}</p>
                  </div>
                </div>

                {/* Plan Content */}
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{plan.description}</p>

                  {/* Pricing */}
                  <div className="mb-4">
                    <div className="flex items-baseline space-x-1">
                      <span className="text-3xl font-bold text-gray-900">
                        ₹{plan.pricing.monthly}
                      </span>
                      <span className="text-gray-500">/month</span>
                    </div>
                    <p className="text-sm text-green-600 font-medium">
                      Save up to 20% on longer plans
                    </p>
                  </div>

                  {/* Benefits */}
                  <div className="mb-6">
                    {plan.benefits.slice(0, 3).map((benefit, i) => (
                      <div key={i} className="flex items-center space-x-2 mb-2">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Link
                    to={`/subscription-plans/${plan.id}`}
                    className={`w-full bg-gradient-to-r ${colorMap[plan.color as keyof typeof colorMap]} text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-all duration-300 group`}
                  >
                    <span>View Details</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
            className="inline-flex items-center space-x-2 bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105"
          >
            <span>Compare All Plans</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}