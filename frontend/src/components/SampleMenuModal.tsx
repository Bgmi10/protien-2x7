import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RefreshCw } from 'lucide-react';
import { sampleMenuApi } from '../services/api';

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

interface SampleMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SampleMenuModal({ isOpen, onClose }: SampleMenuModalProps) {
  const [dishes, setDishes] = useState<SampleMenuDish[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchDishes();
    }
  }, [isOpen]);

  const fetchDishes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await sampleMenuApi.getAll();
      if (response.success) {
        setDishes(response.data);
      } else {
        setError(response.error || 'Failed to fetch dishes');
      }
    } catch (err) {
      setError('Failed to fetch dishes');
      console.error('Error fetching dishes:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 z-10">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                      Sample Menu
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      Explore our delicious and nutritious meal options
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="h-6 w-6 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {loading ? (
                  <div className="flex justify-center items-center py-12">
                    <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
                  </div>
                ) : error ? (
                  <div className="text-center py-12">
                    <p className="text-red-600">{error}</p>
                    <button
                      onClick={fetchDishes}
                      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Retry
                    </button>
                  </div>
                ) : dishes.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dishes.map((dish) => (
                      <div
                        key={dish.id}
                        className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                      >
                        {/* Dish Image */}
                        {dish.image_url ? (
                          <div className="h-48 overflow-hidden">
                            <img
                              src={dish.image_url}
                              alt={dish.dish_name}
                              className="w-full h-full object-cover"
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
                        <div className="p-4">
                          <h3 className="text-lg font-bold text-gray-900 mb-2">{dish.dish_name}</h3>
                          
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

                          {/* Nutrition Info - Compact Grid */}
                          <div className="border-t pt-3">
                            <p className="text-sm font-semibold text-gray-700 mb-2">Nutritional Info:</p>
                            <div className="grid grid-cols-3 gap-1 text-center">
                              <div className="p-1.5 bg-orange-50 rounded">
                                <p className="text-sm font-bold text-orange-600">{dish.calories}</p>
                                <p className="text-xs text-gray-600">Cal</p>
                              </div>
                              <div className="p-1.5 bg-blue-50 rounded">
                                <p className="text-sm font-bold text-blue-600">{dish.protein}g</p>
                                <p className="text-xs text-gray-600">Protein</p>
                              </div>
                              <div className="p-1.5 bg-green-50 rounded">
                                <p className="text-sm font-bold text-green-600">{dish.carbs}g</p>
                                <p className="text-xs text-gray-600">Carbs</p>
                              </div>
                              <div className="p-1.5 bg-yellow-50 rounded">
                                <p className="text-sm font-bold text-yellow-600">{dish.fat}g</p>
                                <p className="text-xs text-gray-600">Fat</p>
                              </div>
                              <div className="p-1.5 bg-pink-50 rounded">
                                <p className="text-sm font-bold text-pink-600">{dish.sugar}g</p>
                                <p className="text-xs text-gray-600">Sugar</p>
                              </div>
                              <div className="p-1.5 bg-purple-50 rounded">
                                <p className="text-sm font-bold text-purple-600">{dish.fiber}g</p>
                                <p className="text-xs text-gray-600">Fiber</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-600 text-lg">No dishes available at the moment.</p>
                    <p className="text-gray-500 mt-2">Please check back later!</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6">
                <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                  <p className="text-sm text-gray-600">
                    * Menu items are carefully crafted for optimal nutrition
                  </p>
                  <button
                    onClick={onClose}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Close Menu
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}