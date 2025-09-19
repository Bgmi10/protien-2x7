import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin,
  Heart
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 lg:py-12">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {/* Company Info */}
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center space-x-1 sm:space-x-2 mb-2 sm:mb-3 lg:mb-4">
              <img src="/assets/logo1.png" alt="protein2x7" className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10" />
              <span className="text-sm sm:text-lg lg:text-2xl font-bold">protein2x7</span>
            </div>
            <p className="text-sm sm:text-sm lg:text-base text-gray-400 mb-3 sm:mb-4">
              Fresh, hygienic, and protein-rich meals delivered twice daily, seven days a week.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs sm:text-base lg:text-lg font-semibold mb-2 sm:mb-3 lg:mb-4">Quick Links</h3>
            <ul className="space-y-1 sm:space-y-1.5 lg:space-y-2">
              <li>
                <Link to="/subscription-plans" className="text-sm sm:text-sm lg:text-base text-gray-400 hover:text-blue-500 transition-colors">
                  Subscription Plans
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-sm sm:text-sm lg:text-base text-gray-400 hover:text-blue-500 transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/coaching" className="text-sm sm:text-sm lg:text-base text-gray-400 hover:text-blue-500 transition-colors">
                  Personal Dietician
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm sm:text-sm lg:text-base text-gray-400 hover:text-blue-500 transition-colors">
                  Fitness Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xs sm:text-base lg:text-lg font-semibold mb-2 sm:mb-3 lg:mb-4">Support</h3>
            <ul className="space-y-1 sm:space-y-1.5 lg:space-y-2">
              <li>
                <Link to="/about" className="text-sm sm:text-sm lg:text-base text-gray-400 hover:text-blue-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm sm:text-sm lg:text-base text-gray-400 hover:text-blue-500 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/hygiene-quality" className="text-sm sm:text-sm lg:text-base text-gray-400 hover:text-blue-500 transition-colors">
                  Hygiene & Quality
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-sm sm:text-sm lg:text-base text-gray-400 hover:text-blue-500 transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm sm:text-sm lg:text-base text-gray-400 hover:text-blue-500 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/shipping-policy" className="text-sm sm:text-sm lg:text-base text-gray-400 hover:text-blue-500 transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/return-policy" className="text-sm sm:text-sm lg:text-base text-gray-400 hover:text-blue-500 transition-colors">
                  Return Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-2 sm:col-span-1">
            <h3 className="text-xs sm:text-base lg:text-lg font-semibold mb-2 sm:mb-3 lg:mb-4">Get in Touch</h3>
            <div className="space-y-2 sm:space-y-2.5 lg:space-y-3">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Mail className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-blue-500" />
                <a href="mailto:protein2x7@gmail.com" className="text-sm sm:text-sm lg:text-base text-gray-400 hover:text-blue-400 transition-colors">
                  protein2x7@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Phone className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-blue-500" />
                <a href="tel:9001933588" className="text-sm sm:text-sm lg:text-base text-gray-400 hover:text-blue-400 transition-colors">
                  9001933588
                </a>
              </div>
              <div className="flex items-start space-x-2 sm:space-x-3">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-blue-500 mt-0.5 sm:mt-1" />
                <span className="text-sm sm:text-sm lg:text-base text-gray-400">
                  protein2x7,<br />
                  Jaipur, Rajasthan<br />
                  302018
                </span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-3 sm:mt-4 lg:mt-6">
              <h4 className="text-sm sm:text-xs lg:text-sm font-semibold mb-1 sm:mb-2">Subscribe to Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-2 py-1 sm:px-3 sm:py-2 bg-gray-800 text-white text-sm sm:text-sm rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-blue-600 hover:bg-blue-700 px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-2 text-sm sm:text-sm rounded-r-lg transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory Info */}
        <div className="border-t border-gray-800 mt-4 sm:mt-6 lg:mt-8 pt-4 sm:pt-6 lg:pt-8">
          <div className="flex flex-wrap justify-center items-center gap-4 mb-3">
            {/* FSSAI License with Logo */}
            <div className="flex items-center space-x-2 text-gray-400">
              <img 
                src="/assets/fssai-logo.png" 
                alt="FSSAI" 
                className="h-6 w-6 object-contain bg-white rounded p-0.5"
                onError={(e) => {
                  e.currentTarget.src = "https://imgs.search.brave.com/CHtRwHAuoj9Qc9W72lqhWwxiZADIZzErm8VCAogveoQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zZWVr/dmVjdG9ycy5jb20v/c3RvcmFnZS9pbWFn/ZXMvRlNTQUklMjBM/T0dPLnN2Zw";
                }}
              />
              <div className="text-xs">
                <span className="text-gray-500">License:</span>
                <span className="ml-1 text-gray-300">22225059000857</span>
              </div>
            </div>
            
            <span className="text-gray-700 hidden sm:inline">•</span>
            
            {/* MSME Registration */}
            <div className="text-xs text-gray-400">
              <span className="text-gray-500">MSME:</span>
              <span className="ml-1 text-gray-300">UDYAM-RJ-17-0539766</span>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm sm:text-xs lg:text-sm text-gray-400">
              © 2024 protein2x7. All rights reserved.
            </p>
            <p className="text-sm sm:text-xs lg:text-sm text-gray-400 flex items-center mt-2 md:mt-0">
              Made with <Heart className="h-2 w-2 sm:h-3 sm:w-3 lg:h-4 lg:w-4 text-red-500 mx-0.5 sm:mx-1" /> for fitness enthusiasts
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}