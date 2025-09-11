import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Salad, Coffee, Moon, ChevronLeft, ChevronRight } from 'lucide-react';

interface MealItem {
  name: string;
  calories: number;
  protein: number;
}

interface DayMenu {
  day: string;
  breakfast: MealItem[];
  lunch: MealItem[];
  dinner: MealItem[];
}

const sampleMenu: DayMenu[] = [
  {
    day: 'Monday',
    breakfast: [
      { name: 'Protein Pancakes with Berries', calories: 320, protein: 25 },
      { name: 'Greek Yogurt Bowl', calories: 280, protein: 20 },
    ],
    lunch: [
      { name: 'Grilled Chicken Salad', calories: 450, protein: 40 },
      { name: 'Quinoa Power Bowl', calories: 420, protein: 35 },
    ],
    dinner: [
      { name: 'Lean Beef Stir-Fry', calories: 480, protein: 45 },
      { name: 'Baked Salmon with Vegetables', calories: 460, protein: 42 },
    ],
  },
  {
    day: 'Tuesday',
    breakfast: [
      { name: 'Egg White Omelette', calories: 290, protein: 28 },
      { name: 'Protein Smoothie Bowl', calories: 310, protein: 22 },
    ],
    lunch: [
      { name: 'Turkey Wrap with Hummus', calories: 440, protein: 38 },
      { name: 'Chicken Tikka Bowl', calories: 470, protein: 42 },
    ],
    dinner: [
      { name: 'Grilled Fish with Quinoa', calories: 450, protein: 40 },
      { name: 'Lean Pork with Sweet Potato', calories: 490, protein: 43 },
    ],
  },
  {
    day: 'Wednesday',
    breakfast: [
      { name: 'Overnight Protein Oats', calories: 330, protein: 24 },
      { name: 'Scrambled Tofu Bowl', calories: 300, protein: 26 },
    ],
    lunch: [
      { name: 'Mediterranean Chicken Bowl', calories: 460, protein: 41 },
      { name: 'Lentil Protein Curry', calories: 430, protein: 36 },
    ],
    dinner: [
      { name: 'Herb-Crusted Chicken Breast', calories: 470, protein: 44 },
      { name: 'Vegetarian Protein Bowl', calories: 440, protein: 38 },
    ],
  },
  {
    day: 'Thursday',
    breakfast: [
      { name: 'Protein French Toast', calories: 340, protein: 26 },
      { name: 'Cottage Cheese Parfait', calories: 290, protein: 23 },
    ],
    lunch: [
      { name: 'Asian Chicken Salad', calories: 440, protein: 39 },
      { name: 'Black Bean Power Bowl', calories: 450, protein: 37 },
    ],
    dinner: [
      { name: 'Grilled Shrimp Skewers', calories: 430, protein: 41 },
      { name: 'Turkey Meatballs with Zoodles', calories: 460, protein: 40 },
    ],
  },
  {
    day: 'Friday',
    breakfast: [
      { name: 'Protein Waffles', calories: 350, protein: 27 },
      { name: 'Spinach Mushroom Frittata', calories: 310, protein: 25 },
    ],
    lunch: [
      { name: 'Teriyaki Chicken Bowl', calories: 480, protein: 43 },
      { name: 'Chickpea Salad Sandwich', calories: 420, protein: 34 },
    ],
    dinner: [
      { name: 'Baked Cod with Asparagus', calories: 440, protein: 42 },
      { name: 'Lean Beef Tacos', calories: 490, protein: 45 },
    ],
  },
  {
    day: 'Saturday',
    breakfast: [
      { name: 'Protein Crepes', calories: 320, protein: 24 },
      { name: 'Avocado Toast with Eggs', calories: 360, protein: 22 },
    ],
    lunch: [
      { name: 'Grilled Paneer Tikka', calories: 450, protein: 38 },
      { name: 'Chicken Caesar Salad', calories: 470, protein: 41 },
    ],
    dinner: [
      { name: 'Lamb Kebabs with Salad', calories: 500, protein: 46 },
      { name: 'Tofu Stir-Fry', calories: 420, protein: 35 },
    ],
  },
  {
    day: 'Sunday',
    breakfast: [
      { name: 'Protein Muffins', calories: 300, protein: 23 },
      { name: 'Veggie Scramble', calories: 330, protein: 26 },
    ],
    lunch: [
      { name: 'BBQ Chicken Bowl', calories: 490, protein: 44 },
      { name: 'Mexican Protein Bowl', calories: 460, protein: 40 },
    ],
    dinner: [
      { name: 'Roasted Turkey Breast', calories: 470, protein: 45 },
      { name: 'Lentil Walnut Bolognese', calories: 440, protein: 36 },
    ],
  },
];

interface SampleMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SampleMenuModal({ isOpen, onClose }: SampleMenuModalProps) {
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const currentDay = sampleMenu[currentDayIndex];

  const nextDay = () => {
    setCurrentDayIndex((prev) => (prev + 1) % sampleMenu.length);
  };

  const prevDay = () => {
    setCurrentDayIndex((prev) => (prev - 1 + sampleMenu.length) % sampleMenu.length);
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
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 z-10">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                      Sample Weekly Menu
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

              {/* Day Navigation */}
              <div className="bg-blue-50 p-4 flex items-center justify-between">
                <button
                  onClick={prevDay}
                  className="p-2 hover:bg-blue-100 rounded-full transition-colors"
                >
                  <ChevronLeft className="h-5 w-5 text-blue-600" />
                </button>
                
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-blue-900">{currentDay.day}</h3>
                </div>
                
                <button
                  onClick={nextDay}
                  className="p-2 hover:bg-blue-100 rounded-full transition-colors"
                >
                  <ChevronRight className="h-5 w-5 text-blue-600" />
                </button>
              </div>

              {/* Menu Content */}
              <div className="p-6 space-y-6">
                {/* Breakfast */}
                <div className="bg-yellow-50 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Coffee className="h-5 w-5 text-yellow-600" />
                    <h4 className="text-lg font-semibold text-gray-900">Breakfast</h4>
                    <span className="text-sm text-gray-500">(7:00 AM - 9:00 AM)</span>
                  </div>
                  <div className="space-y-2">
                    {currentDay.breakfast.map((meal, index) => (
                      <div key={index} className="bg-white rounded-lg p-3 flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-900">{meal.name}</p>
                          <div className="flex space-x-3 mt-1">
                            <span className="text-xs text-gray-500">{meal.calories} cal</span>
                            <span className="text-xs text-blue-600 font-medium">{meal.protein}g protein</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Lunch */}
                <div className="bg-green-50 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Salad className="h-5 w-5 text-green-600" />
                    <h4 className="text-lg font-semibold text-gray-900">Lunch</h4>
                    <span className="text-sm text-gray-500">(12:30 PM - 2:00 PM)</span>
                  </div>
                  <div className="space-y-2">
                    {currentDay.lunch.map((meal, index) => (
                      <div key={index} className="bg-white rounded-lg p-3 flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-900">{meal.name}</p>
                          <div className="flex space-x-3 mt-1">
                            <span className="text-xs text-gray-500">{meal.calories} cal</span>
                            <span className="text-xs text-blue-600 font-medium">{meal.protein}g protein</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dinner */}
                <div className="bg-purple-50 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Moon className="h-5 w-5 text-purple-600" />
                    <h4 className="text-lg font-semibold text-gray-900">Dinner</h4>
                    <span className="text-sm text-gray-500">(7:00 PM - 9:00 PM)</span>
                  </div>
                  <div className="space-y-2">
                    {currentDay.dinner.map((meal, index) => (
                      <div key={index} className="bg-white rounded-lg p-3 flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-900">{meal.name}</p>
                          <div className="flex space-x-3 mt-1">
                            <span className="text-xs text-gray-500">{meal.calories} cal</span>
                            <span className="text-xs text-blue-600 font-medium">{meal.protein}g protein</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Day Selector */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-600 mb-3">Quick Navigation</p>
                  <div className="flex flex-wrap gap-2">
                    {sampleMenu.map((day, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentDayIndex(index)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                          index === currentDayIndex
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {day.day}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6">
                <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                  <p className="text-sm text-gray-600">
                    * Menu items are subject to seasonal availability and dietary preferences
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