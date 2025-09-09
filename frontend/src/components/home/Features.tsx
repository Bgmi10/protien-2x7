import { motion } from 'framer-motion';
import { 
  Shield, 
  Truck, 
  Users, 
  Award, 
  Clock, 
  Heart,
  Zap,
  Target
} from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: '100% Authentic',
    description: 'Only genuine products from certified manufacturers with quality certificates.',
    color: 'text-blue-500'
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Free delivery within 2-3 days in metro cities, 4-5 days elsewhere.',
    color: 'text-green-500'
  },
  {
    icon: Users,
    title: 'Expert Guidance',
    description: 'Get personalized nutrition advice from certified fitness experts.',
    color: 'text-purple-500'
  },
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'Third-party tested supplements that meet international standards.',
    color: 'text-red-500'
  },
  {
    icon: Clock,
    title: 'Flexible Plans',
    description: 'Pause, modify, or cancel your subscription anytime without hassle.',
    color: 'text-yellow-500'
  },
  {
    icon: Heart,
    title: 'Health Focused',
    description: 'Carefully curated combinations for optimal health and performance.',
    color: 'text-pink-500'
  },
  {
    icon: Zap,
    title: 'Quick Results',
    description: 'See visible improvements in strength and physique within 4-6 weeks.',
    color: 'text-orange-500'
  },
  {
    icon: Target,
    title: 'Goal Oriented',
    description: 'Plans designed specifically for muscle gain, fat loss, and performance.',
    color: 'text-indigo-500'
  }
];

export default function Features() {
  return (
    <section className="py-8 sm:py-16 lg:py-20 bg-white">
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
            Why Choose
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              {' '}protein2x7?
            </span>
          </h2>
          <p className="text-sm sm:text-lg lg:text-xl text-gray-600 max-w-xs sm:max-w-2xl lg:max-w-3xl mx-auto px-2">
            We're committed to providing the highest quality supplements and service to fuel your fitness journey
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600 to-green-600 rounded-lg sm:rounded-2xl p-3 sm:p-6 lg:p-8 mb-6 sm:mb-12 lg:mb-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 lg:gap-8 text-center text-white">
            <div>
              <div className="text-lg sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">50,000+</div>
              <div className="text-sm sm:text-sm lg:text-base text-blue-100">Happy Customers</div>
            </div>
            <div>
              <div className="text-lg sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">1M+</div>
              <div className="text-sm sm:text-sm lg:text-base text-blue-100">Products Delivered</div>
            </div>
            <div>
              <div className="text-lg sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">99.8%</div>
              <div className="text-sm sm:text-sm lg:text-base text-blue-100">Customer Satisfaction</div>
            </div>
            <div>
              <div className="text-lg sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">5★</div>
              <div className="text-sm sm:text-sm lg:text-base text-blue-100">Average Rating</div>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-gray-200 h-full">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 ${feature.color} bg-gray-50 rounded-lg flex items-center justify-center mb-2 sm:mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                </div>
                <h3 className="text-lg sm:text-lg lg:text-xl font-bold text-gray-900 mb-1 sm:mb-1.5 lg:mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-sm lg:text-base text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-6 sm:mt-12 lg:mt-16"
        >
          <div className="bg-gray-50 rounded-lg sm:rounded-2xl p-4 sm:p-6 lg:p-8 max-w-xs sm:max-w-2xl lg:max-w-4xl mx-auto">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3 lg:mb-4">
              Ready to Transform Your Body?
            </h3>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-3 sm:mb-5 lg:mb-6">
              Join thousands of satisfied customers who've achieved their fitness goals with our premium protein subscriptions.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 sm:px-6 sm:py-2.5 lg:px-8 lg:py-3 rounded-lg font-semibold text-sm sm:text-sm lg:text-base transition-colors">
                Start Your Journey Today
              </button>
              <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm sm:text-sm lg:text-base">
                Talk to Our Experts
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}