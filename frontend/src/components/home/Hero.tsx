import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative lg:min-h-screen flex items-center justify-center overflow-hidden lg:mt-[-40px]">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-10"></div>
        <img
          src="/assets/bg.png"
          alt="Fitness background"
          className="sm:h-screen lg:w-full lg:h-full object-cover brightness-50"
        />
      </div>
      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto sm: px-6 lg:px-8 text-center text-white sm: mt-12 lg:mt-0">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full lg:mb-6 mb-3"
          >
            <Star className="lg:h-5 lg:w-5 w-[11px] h-[11px] text-yellow-400" />
            <span className="lg:text-sm text-[8px] font-semibold">Fresh Protein Meals, Twice a Day. Seven Days a Week.</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-xl sm:text-6xl lg:text-7xl font-bold lg:mb-6 mb-4"
          >
            <span className="block bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              Protein-Rich Meals, Anytime.
            </span>
            <span className="block text-white">
              2x7.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-[10px] sm:text-2xl text-gray-200 mb-4 max-w-xl mx-auto"
          >
            Wholesome, hygienic, and customized protein meals to match your fitness goals — delivered fresh, always.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.0 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <Link
              to="/subscription-plans"
              className="sm: mb-10 lg:mb-0 group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white lg:px-8 lg:py-4 px-4 py-1 rounded-full font-bold lg:text-lg sm: text-xs transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center space-x-2"
            >
              <span>Choose Your Plan</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 sm: hidden lg:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}