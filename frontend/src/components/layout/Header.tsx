import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, ShoppingCart } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  //@ts-ignore
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (dropdown: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 100);
  };

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
        <div className="flex items-center justify-between lg:h-24 h-18">
          {/* Logo with FSSAI */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Link to="/" className="flex items-center">
              <img src="/assets/logo1.png" alt="" className='w-10 sm:w-16 lg:w-20'/>
            </Link>
            
            {/* Divider */}
            <div className="hidden sm:block h-8 lg:h-10 w-px bg-gray-300"></div>
            
            {/* FSSAI Badge */}
            <div className='hidden sm:flex flex-start flex-col'>
              <div className=" sm:flex items-center space-x-2">
                <img 
                  src="https://imgs.search.brave.com/CHtRwHAuoj9Qc9W72lqhWwxiZADIZzErm8VCAogveoQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zZWVr/dmVjdG9ycy5jb20v/c3RvcmFnZS9pbWFn/ZXMvRlNTQUklMjBM/T0dPLnN2Zw" 
                  alt="FSSAI" 
                  className="h-7 w-7 lg:h-9 lg:w-9 object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Food_Safety_and_Standards_Authority_of_India_logo.png/640px-Food_Safety_and_Standards_Authority_of_India_logo.png";
                  }}
                />
                <div className="flex flex-col">
                  <span className="text-[10px] lg:text-xs font-semibold text-gray-700 leading-tight">22225059000857</span>
                </div>
              </div>
              <div className="text-[10px] text-gray-400">
                <span className="text-gray-500">MSME:</span>
                <span className="ml-2 text-[10px] lg:text-xs font-semibold text-gray-700 leading-tight">UDYAM-RJ-17-0539766</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Subscription Plans Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => handleMouseEnter('plans')}
                onMouseLeave={handleMouseLeave}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium transition-colors py-2"
              >
                <span>Meal Subscriptions</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              {activeDropdown === 'plans' && (
                <div
                  onMouseEnter={() => handleMouseEnter('plans')}
                  onMouseLeave={handleMouseLeave}
                  className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-xl py-2"
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
                onMouseEnter={() => handleMouseEnter('products')}
                onMouseLeave={handleMouseLeave}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium transition-colors py-2"
              >
                <span>Our Meals</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              {activeDropdown === 'products' && (
                <div
                  onMouseEnter={() => handleMouseEnter('products')}
                  onMouseLeave={handleMouseLeave}
                  className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-xl py-2"
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
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 lg:px-5 lg:py-2 rounded-lg font-semibold text-xs sm:text-sm lg:text-base transition-all transform hover:scale-105"
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