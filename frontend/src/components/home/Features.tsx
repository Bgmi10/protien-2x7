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
    <section className="py-20 bg-white">
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
            Why Choose
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              {' '}Protein2x4?
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're committed to providing the highest quality supplements and service to fuel your fitness journey
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 mb-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <div className="text-blue-100">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1M+</div>
              <div className="text-blue-100">Products Delivered</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99.8%</div>
              <div className="text-blue-100">Customer Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5★</div>
              <div className="text-blue-100">Average Rating</div>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-gray-200 h-full">
                <div className={`w-12 h-12 ${feature.color} bg-gray-50 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
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
          className="text-center mt-16"
        >
          <div className="bg-gray-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Body?
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Join thousands of satisfied customers who've achieved their fitness goals with our premium protein subscriptions.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Start Your Journey Today
              </button>
              <button className="text-blue-600 hover:text-blue-700 font-semibold">
                Talk to Our Experts
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}