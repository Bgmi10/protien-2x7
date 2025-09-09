import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { testimonials } from '../utils/constants';

export default function Testimonials() {
  return (
    <div className="pt-16 sm:pt-20 pb-8 sm:pb-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6 sm:mb-12 lg:mb-16"
        >
          <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3 lg:mb-4">Customer Success Stories</h1>
          <p className="text-sm sm:text-lg lg:text-xl text-gray-600 px-2">Real transformations from our satisfied customers</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg sm:rounded-xl shadow-lg p-3 sm:p-4 lg:p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3 lg:mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-sm lg:text-base">{testimonial.name}</h3>
                  <p className="text-gray-600 text-sm sm:text-xs lg:text-sm">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex items-center space-x-0.5 sm:space-x-1 mb-2 sm:mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-2.5 w-2.5 sm:h-3 sm:w-3 lg:h-4 lg:w-4 text-yellow-400" fill="currentColor" />
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-xs lg:text-sm">"{testimonial.content}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}