import { motion } from 'framer-motion';
import { 
  Leaf, 
  Wheat, 
  Shield, 
  Sparkles, 
  Heart,
  ChefHat
} from 'lucide-react';

const features = [
  {
    icon: ChefHat,
    title: "Smart Cooking, No Excess Oil",
    description: "We use just the right amount of oil or ghee, never more than your body needs.",
    color: "text-orange-500",
    bgColor: "bg-orange-50"
  },
  {
    icon: Leaf,
    title: "Clean & Safe Ingredients",
    description: "All vegetables, grains, and dals go through a two-step cleaning process to remove pesticides, chemicals, and harmful residues.",
    color: "text-green-500",
    bgColor: "bg-green-50"
  },
  {
    icon: Wheat,
    title: "Premium Raw Materials",
    description: "We carefully select only the finest, nutrition-certified ingredients so every bite fuels you with the best.",
    color: "text-amber-500",
    bgColor: "bg-amber-50"
  },
  {
    icon: Shield,
    title: "Uncompromised Quality",
    description: "We never cut corners on cost when it comes to your health and nutrition.",
    color: "text-blue-500",
    bgColor: "bg-blue-50"
  },
  {
    icon: Sparkles,
    title: "Hygiene First",
    description: "Every meal is prepared under strict hygiene standards, fully aligned with government food safety norms.",
    color: "text-purple-500",
    bgColor: "bg-purple-50"
  },
  {
    icon: Heart,
    title: "Nutrition You Can Trust",
    description: "Every dish is balanced, wholesome, and crafted to support your fitness journey.",
    color: "text-red-500",
    bgColor: "bg-red-50"
  }
];

export default function WhyProtein2x7() {
  return (
    <section className="py-8 sm:py-16 lg:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-6 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-4 lg:mb-6">
            Why
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              {' '}protein2x7?
            </span>
          </h2>
          <p className="text-[12px] sm:text-lg lg:text-xl text-gray-700 max-w-xs sm:max-w-2xl lg:max-w-3xl mx-auto font-medium px-2">
            At protein2x7, we believe fitness begins with food — and quality is our promise.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="bg-white rounded-lg sm:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 h-full border border-gray-100 hover:border-blue-200">
                {/* Icon */}
                <div className={`w-8 h-8 sm:w-12 sm:h-12 lg:w-14 lg:h-14 ${feature.bgColor} rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`h-4 w-4 sm:h-6 sm:w-6 lg:h-7 lg:w-7 ${feature.color}`} />
                </div>
                
                {/* Content */}
                <h3 className="text-sm sm:text-lg lg:text-xl font-bold text-gray-900 mb-1 sm:mb-2 lg:mb-3">
                  {feature.title}
                </h3>
                <p className="text-[10px] sm:text-base lg:text-base text-gray-600 leading-relaxed">
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
          <div className="inline-flex items-center space-x-1 sm:space-x-2 bg-gradient-to-r from-blue-50 to-green-50 px-3 py-2 sm:px-4 sm:py-2 lg:px-6 lg:py-3 rounded-full">
            <Shield className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-blue-600" />
            <span className="text-[10px] sm:text-sm lg:text-base text-gray-800 font-medium">
              Every meal crafted with care, delivered with trust.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}