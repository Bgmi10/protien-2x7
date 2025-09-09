import { motion } from 'framer-motion';
import { Truck, Clock, MapPin, Phone, Mail } from 'lucide-react';

export default function ShippingPolicy() {
  return (
    <div className="pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-16 lg:pb-20 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Shipping Policy
          </h1>
          <p className="text-sm sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            We deliver fresh, protein-rich meals directly to your doorstep with care and reliability.
          </p>
        </motion.div>

        {/* Shipping Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gray-50 rounded-xl p-6 sm:p-8 lg:p-10 mb-8 sm:mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-3 sm:p-4 w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 flex items-center justify-center">
                <Truck className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Free Delivery</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Complimentary delivery on all meal subscriptions
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-3 sm:p-4 w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 flex items-center justify-center">
                <Clock className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Fresh Daily</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Meals delivered fresh twice daily, 7 days a week
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-3 sm:p-4 w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 flex items-center justify-center">
                <MapPin className="h-8 w-8 sm:h-10 sm:w-10 text-purple-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Service Area</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Currently serving Jaipur and surrounding areas
              </p>
            </div>
          </div>
        </motion.div>

        {/* Policy Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-8 sm:space-y-10 lg:space-y-12"
        >
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              Delivery Schedule
            </h2>
            <div className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">Morning Delivery</h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-2">
                    <strong>Time:</strong> 7:00 AM - 9:00 AM
                  </p>
                  <p className="text-sm sm:text-base text-gray-600">
                    Fresh breakfast and lunch meals delivered to start your day right.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">Evening Delivery</h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-2">
                    <strong>Time:</strong> 6:00 PM - 8:00 PM
                  </p>
                  <p className="text-sm sm:text-base text-gray-600">
                    Dinner and next day's breakfast delivered fresh for your evening.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              Shipping Information
            </h2>
            <div className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8">
              <ul className="space-y-4 sm:space-y-6">
                <li className="flex items-start space-x-3">
                  <div className="bg-blue-100 rounded-full p-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <p className="text-sm sm:text-base text-gray-700">
                    <strong>Free Delivery:</strong> All meal subscriptions include complimentary delivery within our service area.
                  </p>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="bg-blue-100 rounded-full p-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <p className="text-sm sm:text-base text-gray-700">
                    <strong>Service Area:</strong> Currently delivering to Jaipur (302018) and nearby areas.
                  </p>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="bg-blue-100 rounded-full p-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <p className="text-sm sm:text-base text-gray-700">
                    <strong>Delivery Days:</strong> 7 days a week, including weekends and holidays.
                  </p>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="bg-blue-100 rounded-full p-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <p className="text-sm sm:text-base text-gray-700">
                    <strong>Packaging:</strong> Eco-friendly, insulated packaging to maintain freshness and temperature.
                  </p>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="bg-blue-100 rounded-full p-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <p className="text-sm sm:text-base text-gray-700">
                    <strong>Contact-Free Delivery:</strong> Safe, hygienic delivery with minimal contact options available.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 sm:mt-16 lg:mt-20"
        >
          <div className="bg-blue-50 rounded-xl p-6 sm:p-8 lg:p-10 text-center">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              Questions About Delivery?
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-6 sm:mb-8">
              Our team is here to help with any shipping or delivery questions you may have.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-600" />
                <span className="text-sm sm:text-base font-medium text-gray-900">9001933588</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-600" />
                <span className="text-sm sm:text-base font-medium text-gray-900">protein2x7@gmail.com</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}