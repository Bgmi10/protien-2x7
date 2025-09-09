import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { faqs } from '../utils/constants';

export default function FAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="lg:pt-32 sm: pt-20 pb-8 min-h-screen">
      <div className="max-w-xs sm:max-w-2xl lg:max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6 sm:mb-12 lg:mb-16"
        >
          <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3 lg:mb-4">Frequently Asked Questions</h1>
          <p className="text-sm sm:text-lg lg:text-xl text-gray-600 px-2">Get answers to common questions about our products and services</p>
        </motion.div>

        <div className="space-y-2 sm:space-y-3 lg:space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full text-left p-3 sm:p-4 lg:p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 pr-2">{faq.question}</h3>
                <ChevronDown className={`h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-gray-500 transition-transform flex-shrink-0 ${
                  openFaq === index ? 'transform rotate-180' : ''
                }`} />
              </button>
              {openFaq === index && (
                <div className="px-3 pb-3 sm:px-4 sm:pb-4 lg:px-6 lg:pb-6">
                  <p className="text-sm sm:text-sm lg:text-base text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}