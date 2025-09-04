import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ShoppingCart, Dumbbell } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const subscriptionPlans = [
    { name: 'Weekly Meal Plan', path: '/subscription-plans/weekly' },
    { name: 'Monthly Meal Plan', path: '/subscription-plans/monthly' },
    { name: 'Custom Meal Plan', path: '/subscription-plans/custom' },
    { name: 'High-Protein Special', path: '/subscription-plans/high-protein' },
  ];

  const meals = [
    { name: 'Vegetarian High-Protein', path: '/meals/vegetarian' },
    { name: 'Chicken & Fish Meals', path: '/meals/non-vegetarian' },
    { name: 'Post-Workout Meals', path: '/meals/post-workout' },
    { name: 'Breakfast Specials', path: '/meals/breakfast' },
  ];

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 bg-white ${
      isScrolled ? 'bg-opacity-90 shadow-lg' : 'bg-opacity-80'
    }`} style={{
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)'
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/assets/logo.png" alt="" className='w-40'/>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Subscription Plans Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setActiveDropdown('plans')}
                onMouseLeave={() => setActiveDropdown(null)}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                <span>Meal Subscriptions</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              {activeDropdown === 'plans' && (
                <div
                  onMouseEnter={() => setActiveDropdown('plans')}
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl py-2"
                >
                  {subscriptionPlans.map((plan) => (
                    <Link
                      key={plan.path}
                      to={plan.path}
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      {plan.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Products Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setActiveDropdown('products')}
                onMouseLeave={() => setActiveDropdown(null)}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                <span>Our Meals</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              {activeDropdown === 'products' && (
                <div
                  onMouseEnter={() => setActiveDropdown('products')}
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2"
                >
                  {meals.map((meal) => (
                    <Link
                      key={meal.path}
                      to={meal.path}
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      {meal.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/hygiene-quality"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Hygiene & Quality
            </Link>

            <Link
              to="/blog"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Blog
            </Link>

            <Link
              to="/about"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              About Us
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="relative p-2">
              <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-blue-600 transition-colors" />
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
                0
              </span>
            </button>
            <Link
              to="/subscription-plans"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold transition-all transform hover:scale-105"
            >
              Choose Your Plan
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-3">
            <div>
              <p className="text-gray-500 text-sm font-semibold mb-2">Meal Subscriptions</p>
              {subscriptionPlans.map((plan) => (
                <Link
                  key={plan.path}
                  to={plan.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 text-gray-700 hover:text-blue-600"
                >
                  {plan.name}
                </Link>
              ))}
            </div>
            
            <div>
              <p className="text-gray-500 text-sm font-semibold mb-2">Our Meals</p>
              {meals.map((meal) => (
                <Link
                  key={meal.path}
                  to={meal.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 text-gray-700 hover:text-blue-600"
                >
                  {meal.name}
                </Link>
              ))}
            </div>

            <Link
              to="/hygiene-quality"
              onClick={() => setIsMenuOpen(false)}
              className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
            >
              Hygiene & Quality
            </Link>

            <Link
              to="/blog"
              onClick={() => setIsMenuOpen(false)}
              className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
            >
              Blog
            </Link>

            <Link
              to="/about"
              onClick={() => setIsMenuOpen(false)}
              className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
            >
              About
            </Link>

            <Link
              to="/subscription-plans"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center px-5 py-3 rounded-lg font-semibold mt-4"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}