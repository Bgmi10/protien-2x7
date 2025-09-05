import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  Dumbbell,
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
              <Dumbbell className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-blue-500" />
              <span className="text-sm sm:text-lg lg:text-2xl font-bold">protein2x7</span>
            </div>
            <p className="text-[10px] sm:text-sm lg:text-base text-gray-400 mb-3 sm:mb-4">
              Fresh, hygienic, and protein-rich meals delivered twice daily, seven days a week.
            </p>
            <div className="flex space-x-2 sm:space-x-3 lg:space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                <Facebook className="h-3 w-3 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                <Instagram className="h-3 w-3 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                <Twitter className="h-3 w-3 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                <Youtube className="h-3 w-3 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs sm:text-base lg:text-lg font-semibold mb-2 sm:mb-3 lg:mb-4">Quick Links</h3>
            <ul className="space-y-1 sm:space-y-1.5 lg:space-y-2">
              <li>
                <Link to="/subscription-plans" className="text-[10px] sm:text-sm lg:text-base text-gray-400 hover:text-blue-500 transition-colors">
                  Subscription Plans
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-[10px] sm:text-sm lg:text-base text-gray-400 hover:text-blue-500 transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/transformation-challenge" className="text-[10px] sm:text-sm lg:text-base text-gray-400 hover:text-blue-500 transition-colors">
                  8-Week Challenge
                </Link>
              </li>
              <li>
                <Link to="/coaching" className="text-[10px] sm:text-sm lg:text-base text-gray-400 hover:text-blue-500 transition-colors">
                  Personal Coaching
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-[10px] sm:text-sm lg:text-base text-gray-400 hover:text-blue-500 transition-colors">
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
                <Link to="/about" className="text-[10px] sm:text-sm lg:text-base text-gray-400 hover:text-blue-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-[10px] sm:text-sm lg:text-base text-gray-400 hover:text-blue-500 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-[10px] sm:text-sm lg:text-base text-gray-400 hover:text-blue-500 transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-[10px] sm:text-sm lg:text-base text-gray-400 hover:text-blue-500 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="#" className="text-[10px] sm:text-sm lg:text-base text-gray-400 hover:text-blue-500 transition-colors">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-[10px] sm:text-sm lg:text-base text-gray-400 hover:text-blue-500 transition-colors">
                  Return Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-2 sm:col-span-1">
            <h3 className="text-xs sm:text-base lg:text-lg font-semibold mb-2 sm:mb-3 lg:mb-4">Get in Touch</h3>
            <div className="space-y-2 sm:space-y-2.5 lg:space-y-3">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Mail className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-blue-500" />
                <a href="mailto:protein2x7@gmail.com" className="text-[10px] sm:text-sm lg:text-base text-gray-400 hover:text-blue-400 transition-colors">
                  protein2x7@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Phone className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-blue-500" />
                <a href="tel:9001933588" className="text-[10px] sm:text-sm lg:text-base text-gray-400 hover:text-blue-400 transition-colors">
                  9001933588
                </a>
              </div>
              <div className="flex items-start space-x-2 sm:space-x-3">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-blue-500 mt-0.5 sm:mt-1" />
                <span className="text-[10px] sm:text-sm lg:text-base text-gray-400">
                  123 Fitness Street,<br />
                  Gym District,<br />
                  Mumbai 400001
                </span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-3 sm:mt-4 lg:mt-6">
              <h4 className="text-[10px] sm:text-xs lg:text-sm font-semibold mb-1 sm:mb-2">Subscribe to Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-2 py-1 sm:px-3 sm:py-2 bg-gray-800 text-white text-[10px] sm:text-sm rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-blue-600 hover:bg-blue-700 px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-2 text-[10px] sm:text-sm rounded-r-lg transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-4 sm:mt-6 lg:mt-8 pt-4 sm:pt-6 lg:pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[10px] sm:text-xs lg:text-sm text-gray-400">
            © 2024 protein2x7. All rights reserved.
          </p>
          <p className="text-[10px] sm:text-xs lg:text-sm text-gray-400 flex items-center mt-2 md:mt-0">
            Made with <Heart className="h-2 w-2 sm:h-3 sm:w-3 lg:h-4 lg:w-4 text-red-500 mx-0.5 sm:mx-1" /> for fitness enthusiasts
          </p>
        </div>
      </div>
    </footer>
  );
}