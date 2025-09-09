import { motion } from 'framer-motion';
import { Shield, CheckCircle, Award, Sparkles, ChefHat, Heart } from 'lucide-react';

export default function HygieneQuality() {
  const standards = [
    {
      icon: Shield,
      title: "Government Approved Standards",
      description: "We strictly follow all government food safety regulations and maintain necessary certifications.",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: Sparkles,
      title: "Two-Step Cleaning Process",
      description: "All vegetables, grains, and dals undergo thorough cleaning to remove pesticides and harmful residues.",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: Award,
      title: "Premium Brand Partners",
      description: "We source Paneer and proteins only from established brands that maintain strict quality standards.",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: ChefHat,
      title: "Expert Food Preparation",
      description: "Our trained chefs prepare meals with precise measurements of oil and ghee, never exceeding healthy limits.",
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      icon: CheckCircle,
      title: "Certified Vendors Only",
      description: "All raw materials are sourced from certified and trusted vendors to ensure top quality.",
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      icon: Heart,
      title: "Open Kitchen Policy",
      description: "Book a visit to watch our food preparation process and enjoy a fresh meal at our dining space.",
      color: "text-pink-600",
      bgColor: "bg-pink-50"
    }
  ];

  return (
    <div className="pt-16 sm:pt-20 pb-8 sm:pb-16 min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 landscape:mb-6 sm:mb-12 lg:mb-16"
        >
          <h1 className="text-2xl landscape:text-xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 landscape:mb-2 sm:mb-4 lg:mb-6">
            Our Commitment to
            <span className="block bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Hygiene & Quality
            </span>
          </h1>
          <p className="text-base landscape:text-sm sm:text-lg lg:text-xl text-gray-600 max-w-xs landscape:max-w-lg sm:max-w-2xl lg:max-w-3xl mx-auto px-2">
            Every meal we prepare follows the highest standards of hygiene and quality. 
            Your health and trust are our top priorities.
          </p>
        </motion.div>

        {/* Key Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gradient-to-r from-blue-600 to-green-600 rounded-lg sm:rounded-2xl p-6 landscape:p-4 sm:p-8 lg:p-10 text-white text-center mb-8 landscape:mb-6 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-xl landscape:text-lg sm:text-2xl lg:text-3xl font-bold mb-3 landscape:mb-2 sm:mb-4">
            100% Safe & Hygienic Food Preparation
          </h2>
          <p className="text-base landscape:text-sm sm:text-base lg:text-lg">
            From washing raw ingredients to sanitizing utensils and storing food at the right temperature, 
            everything is handled with utmost care by our trained team.
          </p>
        </motion.div>

        {/* Standards Grid */}
        <div className="grid grid-cols-1 landscape:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 landscape:gap-3 sm:gap-6 lg:gap-8 mb-8 landscape:mb-6 sm:mb-12 lg:mb-16">
          {standards.map((standard, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-white rounded-lg sm:rounded-xl p-4 landscape:p-3 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className={`w-12 h-12 landscape:w-10 landscape:h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 ${standard.bgColor} rounded-lg sm:rounded-xl flex items-center justify-center mb-3 landscape:mb-2 sm:mb-4`}>
                <standard.icon className={`h-6 w-6 landscape:h-5 landscape:w-5 sm:h-7 sm:w-7 lg:h-8 lg:w-8 ${standard.color}`} />
              </div>
              <h3 className="text-base landscape:text-sm sm:text-lg lg:text-xl font-bold text-gray-900 mb-2 landscape:mb-1 sm:mb-3">
                {standard.title}
              </h3>
              <p className="text-sm landscape:text-xs sm:text-sm lg:text-base text-gray-600 leading-relaxed">
                {standard.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Quality Assurance */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white rounded-lg sm:rounded-2xl shadow-xl p-6 landscape:p-4 sm:p-8 lg:p-10 mb-8 landscape:mb-6 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-xl landscape:text-lg sm:text-2xl lg:text-3xl font-bold text-center text-gray-900 mb-4 landscape:mb-3 sm:mb-6 lg:mb-8">
            Our Quality Promise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 landscape:gap-3 sm:gap-6 lg:gap-8">
            <div className="text-center">
              <div className="text-2xl landscape:text-xl sm:text-3xl lg:text-4xl font-bold text-blue-600 mb-2">
                100%
              </div>
              <p className="text-base landscape:text-sm sm:text-base text-gray-700">
                Pure & Unadulterated Ingredients
              </p>
            </div>
            <div className="text-center">
              <div className="text-2xl landscape:text-xl sm:text-3xl lg:text-4xl font-bold text-green-600 mb-2">
                2-Step
              </div>
              <p className="text-base landscape:text-sm sm:text-base text-gray-700">
                Cleaning Process for All Ingredients
              </p>
            </div>
            <div className="text-center">
              <div className="text-2xl landscape:text-xl sm:text-3xl lg:text-4xl font-bold text-red-600 mb-2">
                24/7
              </div>
              <p className="text-base landscape:text-sm sm:text-base text-gray-700">
                Temperature Controlled Storage
              </p>
            </div>
          </div>
        </motion.div>

        {/* Visit Our Kitchen CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg sm:rounded-2xl p-6 landscape:p-4 sm:p-8 lg:p-10 text-center"
        >
          <h3 className="text-xl landscape:text-lg sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 landscape:mb-2 sm:mb-4">
            Visit Our Kitchen
          </h3>
          <p className="text-base landscape:text-sm sm:text-base lg:text-lg text-gray-700 mb-4 landscape:mb-3 sm:mb-6">
            We believe in complete transparency. Book a visit to see how we prepare your meals with care and hygiene.
            Experience our process firsthand and enjoy a fresh meal at our private dining space.
          </p>
          <a 
            href="mailto:protein2x7@gmail.com?subject=Kitchen Visit Request"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 landscape:px-5 landscape:py-2 sm:px-8 sm:py-3 lg:px-10 lg:py-4 rounded-lg sm:rounded-xl font-semibold text-base landscape:text-sm sm:text-base lg:text-lg transition-colors"
          >
            Book Your Visit
          </a>
        </motion.div>
      </div>
    </div>
  );
}