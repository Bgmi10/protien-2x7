import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { testimonials } from '../../utils/constants';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-8 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-50 to-green-50">
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
            Success Stories from
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              {' '}Our Community
            </span>
          </h2>
          <p className="text-[12px] sm:text-lg lg:text-xl text-gray-600 max-w-xs sm:max-w-2xl lg:max-w-3xl mx-auto px-2">
            Real results from real people who transformed their bodies with protein2x7
          </p>
        </motion.div>

        {/* Main Testimonial */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg sm:rounded-2xl lg:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 lg:p-12 mb-6 sm:mb-10 lg:mb-12 max-w-xs sm:max-w-2xl lg:max-w-4xl mx-auto relative"
        >
          {/* Quote Icon */}
          <Quote className="h-8 w-8 sm:h-12 sm:w-12 lg:h-16 lg:w-16 text-blue-100 absolute top-3 left-3 sm:top-4 sm:left-4 lg:top-6 lg:left-6" />
          
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-3 sm:space-y-4 lg:space-y-6 md:space-y-0 md:space-x-4 lg:space-x-8">
            {/* Profile Image */}
            <div className="relative flex-shrink-0">
              <img
                src={testimonials[currentIndex].image}
                alt={testimonials[currentIndex].name}
                className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full object-cover border-2 sm:border-3 lg:border-4 border-blue-100"
              />
              <div className="absolute -bottom-1 -right-1 sm:-bottom-1.5 sm:-right-1.5 lg:-bottom-2 lg:-right-2 bg-green-500 rounded-full p-0.5 sm:p-0.5 lg:p-1">
                <Star className="h-2 w-2 sm:h-3 sm:w-3 lg:h-4 lg:w-4 text-white" fill="currentColor" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              {/* Rating */}
              <div className="flex justify-center md:justify-start items-center space-x-0.5 sm:space-x-1 mb-2 sm:mb-3 lg:mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-yellow-400" fill="currentColor" />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-sm sm:text-lg md:text-xl lg:text-2xl text-gray-800 leading-relaxed mb-3 sm:mb-4 lg:mb-6 italic">
                "{testimonials[currentIndex].content}"
              </blockquote>

              {/* Author Info */}
              <div>
                <h4 className="text-sm sm:text-lg lg:text-xl font-bold text-gray-900">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-[10px] sm:text-sm lg:text-base text-blue-600 font-medium">
                  {testimonials[currentIndex].role}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex items-center justify-center space-x-3 sm:space-x-4 lg:space-x-6">
          <button
            onClick={prevTestimonial}
            className="bg-white hover:bg-gray-50 p-2 sm:p-2.5 lg:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-gray-600" />
          </button>

          {/* Dots Indicator */}
          <div className="flex space-x-1 sm:space-x-1.5 lg:space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-blue-600 w-4 sm:w-6 lg:w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextTestimonial}
            className="bg-white hover:bg-gray-50 p-2 sm:p-2.5 lg:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-gray-600" />
          </button>
        </div>

        {/* All Testimonials Grid (Hidden on mobile) */}
        <div className="hidden lg:grid grid-cols-4 gap-4 lg:gap-6 mt-8 sm:mt-12 lg:mt-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`bg-white p-4 lg:p-6 rounded-lg lg:rounded-xl shadow-lg cursor-pointer transition-all duration-300 ${
                index === currentIndex ? 'ring-2 ring-blue-500 transform scale-105' : 'hover:shadow-xl'
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              <div className="flex items-center space-x-2 lg:space-x-3 mb-2 lg:mb-3">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900 text-xs lg:text-sm">{testimonial.name}</h4>
                  <p className="text-gray-600 text-[10px] lg:text-xs">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex items-center space-x-0.5 lg:space-x-1 mb-1.5 lg:mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-2.5 w-2.5 lg:h-3 lg:w-3 text-yellow-400" fill="currentColor" />
                ))}
              </div>
              <p className="text-gray-700 text-xs lg:text-sm leading-relaxed line-clamp-3">
                "{testimonial.content}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}