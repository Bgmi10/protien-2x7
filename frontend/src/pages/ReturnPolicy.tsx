import { motion } from 'framer-motion';
import { Shield, AlertCircle, Phone, Mail, MessageCircle } from 'lucide-react';

export default function ReturnPolicy() {
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
            Return Policy
          </h1>
          <p className="text-sm sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            Our policy regarding meal returns and how we handle any issues with your orders.
          </p>
        </motion.div>

        {/* Policy Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-amber-50 border border-amber-200 rounded-xl p-6 sm:p-8 lg:p-10 mb-8 sm:mb-12"
        >
          <div className="flex items-start space-x-4">
            <AlertCircle className="h-6 w-6 sm:h-8 sm:w-8 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-amber-900 mb-3 sm:mb-4">
                Non-Returnable Products
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-amber-800 leading-relaxed">
                Due to the fresh and perishable nature of our protein-rich meals, <strong>all food items are non-returnable</strong> under standard circumstances. This policy ensures food safety and hygiene standards for all our customers.
              </p>
            </div>
          </div>
        </motion.div>

        {/* When We Can Help */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-8 sm:space-y-10 lg:space-y-12"
        >
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
              When We Can Assist You
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-red-900 mb-3 sm:mb-4">
                  Quality Issues
                </h3>
                <ul className="space-y-2 text-sm sm:text-base text-red-800">
                  <li>• Spoiled or damaged meals upon delivery</li>
                  <li>• Incorrect temperature during delivery</li>
                  <li>• Foreign objects found in food</li>
                  <li>• Meals not meeting quality standards</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-blue-900 mb-3 sm:mb-4">
                  Delivery Issues
                </h3>
                <ul className="space-y-2 text-sm sm:text-base text-blue-800">
                  <li>• Wrong meals delivered</li>
                  <li>• Missing items from order</li>
                  <li>• Delayed delivery beyond scheduled time</li>
                  <li>• Packaging damaged during transit</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
              How to Report Issues
            </h2>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8">
              <div className="space-y-6 sm:space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 rounded-full p-2">
                    <span className="text-green-600 font-bold text-lg">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                      Contact Immediately
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      Report any issues within 2 hours of delivery for the fastest resolution.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 rounded-full p-2">
                    <span className="text-green-600 font-bold text-lg">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                      Provide Details
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      Include your order number, photos of the issue, and a detailed description.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 rounded-full p-2">
                    <span className="text-green-600 font-bold text-lg">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                      Receive Resolution
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      We'll provide a replacement meal, credit, or refund based on the situation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
              Resolution Options
            </h2>
            
            <div className="bg-gray-50 rounded-lg p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Shield className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Replacement</h3>
                  <p className="text-sm text-gray-600">
                    Fresh replacement meal delivered at no extra cost
                  </p>
                </div>
                
                <div>
                  <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <MessageCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Account Credit</h3>
                  <p className="text-sm text-gray-600">
                    Credit applied to your account for future orders
                  </p>
                </div>
                
                <div>
                  <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-purple-600 font-bold text-xl">₹</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Refund</h3>
                  <p className="text-sm text-gray-600">
                    Full refund processed within 3-5 business days
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 sm:mt-16 lg:mt-20"
        >
          <div className="bg-blue-50 rounded-xl p-6 sm:p-8 lg:p-10 text-center">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              Need Help? Contact Us
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-6 sm:mb-8">
              For any issues with your meals or delivery, reach out to us immediately.
            </p>
            
            <div className="space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-500">Call us</p>
                    <span className="text-sm sm:text-base font-medium text-gray-900">9001933588</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-500">Email us</p>
                    <span className="text-sm sm:text-base font-medium text-gray-900">protein2x7@gmail.com</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  <strong>Address:</strong> protein2x7, Jaipur, Rajasthan 302018
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}