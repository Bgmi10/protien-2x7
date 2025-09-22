import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Star, RefreshCw } from 'lucide-react';
import { mealPlansApi, sampleMenuApi } from '../services/api';

interface MealPlan {
  id: number;
  name: string;
  number_of_meals: number;
  discounted_price: number;
  discount_percent: number;
  original_cost: number;
  is_active: boolean;
  duration_days?: number;
  meal_type?: string;
  plan_type?: string;
  is_trial?: boolean;
  description?: string;
  image_url?: string;
}

interface SampleMenuDish {
  id: number;
  dish_name: string;
  ingredients: string[];
  quantity: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  sugar: number;
  fiber: number;
  image_url?: string;
}

export default function SubscriptionPlans() {
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [dishes, setDishes] = useState<SampleMenuDish[]>([]);
  const [plansLoading, setPlansLoading] = useState(true);
  const [dishesLoading, setDishesLoading] = useState(true);

  useEffect(() => {
    fetchMealPlans();
    fetchDishes();
  }, []);

  const fetchMealPlans = async () => {
    try {
      setPlansLoading(true);
      const response = await mealPlansApi.getAll();
      if (response.success) {
        setMealPlans(response.data);
      }
    } catch (err) {
      console.error('Error fetching meal plans:', err);
    } finally {
      setPlansLoading(false);
    }
  };

  const fetchDishes = async () => {
    try {
      setDishesLoading(true);
      const response = await sampleMenuApi.getAll();
      if (response.success) {
        setDishes(response.data);
      }
    } catch (err) {
      console.error('Error fetching dishes:', err);
    } finally {
      setDishesLoading(false);
    }
  };

  const colorMap = {
    lunch: 'from-blue-500 to-blue-700',
    dinner: 'from-green-500 to-green-700',
    both: 'from-purple-500 to-purple-700',
    default: 'from-red-500 to-red-700',
  };

  const getColorForPlan = (mealType?: string) => {
    return colorMap[mealType as keyof typeof colorMap] || colorMap.default;
  };

  if (plansLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="lg:pt-32 pb-8 sm:pb-16 pt-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6 sm:mb-12 lg:mb-16"
        >
          <h1 className="text-xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-6">
            Choose Your Perfect
            <span className="block bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Meal Plan
            </span>
          </h1>
          <p className="text-sm sm:text-lg lg:text-xl text-gray-600 max-w-xs sm:max-w-2xl lg:max-w-4xl mx-auto mb-4 sm:mb-6 lg:mb-8 px-2">
            Our expertly crafted meal plans are designed to help you achieve your specific fitness goals. 
            Each plan includes premium meals, flexible delivery, and expert guidance.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 lg:space-x-8 text-sm sm:text-sm text-gray-600">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <Check className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-green-500" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2">
              <Check className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-green-500" />
              <span>Free delivery</span>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2">
              <Check className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-green-500" />
              <span>Expert support</span>
            </div>
          </div>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {mealPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white rounded-lg sm:rounded-2xl lg:rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 relative"
            >
              {plan.is_trial && (
                <div className="absolute top-2 right-2 sm:top-4 sm:right-4 lg:top-6 lg:right-6 z-10">
                  <div className="bg-yellow-500 text-white px-2 py-1 sm:px-3 sm:py-1.5 lg:px-4 lg:py-2 rounded-full text-xs sm:text-xs lg:text-sm font-bold flex items-center space-x-0.5 sm:space-x-1">
                    <Star className="h-2 w-2 sm:h-3 sm:w-3 lg:h-4 lg:w-4" fill="currentColor" />
                    <span>Trial Pack</span>
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 h-full">
                {/* Left Side - Image */}
                <div className="relative h-32 sm:h-48 md:h-auto">
                  {plan.image_url ? (
                    <img
                      src={plan.image_url}
                      alt={plan.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={`https://images.unsplash.com/photo-${index % 2 === 0 ? '1583454110551-21f2fa2afe61' : '1567620905'}?w=800`}
                      alt={plan.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className={`absolute inset-0 bg-gradient-to-br ${getColorForPlan(plan.meal_type)} opacity-80`}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white p-3 sm:p-4 lg:p-6">
                      <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2">{plan.name}</h2>
                      <p className="text-sm sm:text-sm lg:text-lg opacity-90">
                        {plan.meal_type && `${plan.meal_type.charAt(0).toUpperCase() + plan.meal_type.slice(1)} Plan`}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Side - Content */}
                <div className="p-4 sm:p-6 lg:p-8 flex flex-col justify-between">
                  <div>
                    <p className="text-sm sm:text-sm lg:text-base text-gray-600 mb-3 sm:mb-4 lg:mb-6 leading-relaxed">
                      {plan.description || `Perfect ${plan.meal_type || 'meal'} plan with ${plan.number_of_meals} delicious meals${plan.duration_days ? ` for ${plan.duration_days} days` : ''}.`}
                    </p>

                    {/* Pricing */}
                    <div className="mb-3 sm:mb-4 lg:mb-6">
                      <div className="flex items-baseline space-x-1 sm:space-x-2 mb-1 sm:mb-2">
                        <span className="text-sm text-gray-500 line-through">₹{plan.original_cost}</span>
                        <span className="text-xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                          ₹{plan.discounted_price}
                        </span>
                      </div>
                      <p className="text-xs sm:text-xs lg:text-sm text-green-600 font-medium mt-0.5 sm:mt-1">
                        Save {plan.discount_percent}% off
                      </p>
                    </div>

                    {/* Benefits */}
                    <div className="mb-3 sm:mb-4 lg:mb-6">
                      <h4 className="text-sm sm:text-sm lg:text-base font-semibold text-gray-900 mb-2 sm:mb-3">What you get:</h4>
                      <div className="space-y-1 sm:space-y-1.5 lg:space-y-2">
                        <div className="flex items-start space-x-2 sm:space-x-3">
                          <Check className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-xs lg:text-sm text-gray-700">{plan.number_of_meals} nutritious meals</span>
                        </div>
                        {plan.duration_days && (
                          <div className="flex items-start space-x-2 sm:space-x-3">
                            <Check className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-xs sm:text-xs lg:text-sm text-gray-700">{plan.duration_days} days duration</span>
                          </div>
                        )}
                        <div className="flex items-start space-x-2 sm:space-x-3">
                          <Check className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-xs lg:text-sm text-gray-700">Free delivery</span>
                        </div>
                        <div className="flex items-start space-x-2 sm:space-x-3">
                          <Check className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-xs lg:text-sm text-gray-700">Expert nutritionist support</span>
                        </div>
                      </div>
                    </div>

                    {/* Plan Details */}
                    <div className="mb-3 sm:mb-4 lg:mb-6">
                      <h4 className="text-sm sm:text-sm lg:text-base font-semibold text-gray-900 mb-2 sm:mb-3">Plan details:</h4>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {plan.meal_type && (
                          <span className="bg-gray-100 text-gray-700 px-2 py-0.5 sm:px-2.5 sm:py-1 lg:px-3 lg:py-1 rounded-full text-xs sm:text-xs lg:text-sm">
                            {plan.meal_type.charAt(0).toUpperCase() + plan.meal_type.slice(1)}
                          </span>
                        )}
                        {plan.plan_type && (
                          <span className="bg-gray-100 text-gray-700 px-2 py-0.5 sm:px-2.5 sm:py-1 lg:px-3 lg:py-1 rounded-full text-xs sm:text-xs lg:text-sm">
                            {plan.plan_type.charAt(0).toUpperCase() + plan.plan_type.slice(1)} Plan
                          </span>
                        )}
                        {plan.is_trial && (
                          <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 sm:px-2.5 sm:py-1 lg:px-3 lg:py-1 rounded-full text-xs sm:text-xs lg:text-sm">
                            Trial
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link
                    to={`/subscription-plans/${plan.id}`}
                    className={`w-full bg-gradient-to-r ${getColorForPlan(plan.meal_type)} text-white py-2 sm:py-3 lg:py-4 rounded-lg sm:rounded-xl font-bold text-sm sm:text-sm lg:text-lg flex items-center justify-center space-x-1 sm:space-x-2 hover:shadow-lg transition-all duration-300 group`}
                  >
                    <span>Get Started</span>
                    <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sample Menu Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 sm:mt-20 lg:mt-24"
        >
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              Sample Menu
            </h2>
            <p className="text-sm sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our delicious and nutritious meal options carefully crafted to support your fitness journey
            </p>
          </div>

          {/* Dishes Grid */}
          {dishesLoading ? (
            <div className="flex justify-center items-center py-12">
              <RefreshCw className="w-8 h-8 text-green-600 animate-spin" />
            </div>
          ) : dishes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {dishes.map((dish, index) => (
                <motion.div
                  key={dish.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  {/* Dish Image */}
                  {dish.image_url ? (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={dish.image_url}
                        alt={dish.dish_name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl mb-2">🍽️</div>
                        <p className="text-green-600 font-medium">Healthy Meal</p>
                      </div>
                    </div>
                  )}

                  {/* Dish Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{dish.dish_name}</h3>
                    
                    {/* Quantity */}
                    <p className="text-sm text-gray-600 mb-3">Serving: {dish.quantity}</p>

                    {/* Ingredients */}
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-700 mb-1">Ingredients:</p>
                      <p className="text-sm text-gray-600">
                        {dish.ingredients.slice(0, 3).join(', ')}
                        {dish.ingredients.length > 3 && ` +${dish.ingredients.length - 3} more`}
                      </p>
                    </div>

                    {/* Nutrition Info */}
                    <div className="border-t pt-4">
                      <p className="text-sm font-semibold text-gray-700 mb-3">Nutritional Information:</p>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-center p-2 bg-orange-50 rounded">
                          <p className="text-lg font-bold text-orange-600">{dish.calories}</p>
                          <p className="text-xs text-gray-600">Calories</p>
                        </div>
                        <div className="text-center p-2 bg-blue-50 rounded">
                          <p className="text-lg font-bold text-blue-600">{dish.protein}g</p>
                          <p className="text-xs text-gray-600">Protein</p>
                        </div>
                        <div className="text-center p-2 bg-green-50 rounded">
                          <p className="text-lg font-bold text-green-600">{dish.carbs}g</p>
                          <p className="text-xs text-gray-600">Carbs</p>
                        </div>
                        <div className="text-center p-2 bg-yellow-50 rounded">
                          <p className="text-lg font-bold text-yellow-600">{dish.fat}g</p>
                          <p className="text-xs text-gray-600">Fat</p>
                        </div>
                        <div className="text-center p-2 bg-pink-50 rounded">
                          <p className="text-lg font-bold text-pink-600">{dish.sugar}g</p>
                          <p className="text-xs text-gray-600">Sugar</p>
                        </div>
                        <div className="text-center p-2 bg-purple-50 rounded">
                          <p className="text-lg font-bold text-purple-600">{dish.fiber}g</p>
                          <p className="text-xs text-gray-600">Fiber</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No dishes available at the moment.</p>
              <p className="text-gray-500 mt-2">Please check back later!</p>
            </div>
          )}
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 sm:mt-16 lg:mt-20 text-center"
        >
          <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3 lg:mb-4">
            Have Questions?
          </h3>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-4 sm:mb-6 lg:mb-8 px-2">
            Our fitness experts are here to help you choose the perfect plan
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
            <Link
              to="/faq"
              className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 sm:px-6 sm:py-2.5 lg:px-8 lg:py-3 rounded-lg font-semibold text-sm sm:text-sm lg:text-base transition-colors"
            >
              View FAQ
            </Link>
            <Link
              to="/contact"
              className="text-blue-600 hover:text-blue-700 font-semibold text-sm sm:text-sm lg:text-base"
            >
              Talk to Expert
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}