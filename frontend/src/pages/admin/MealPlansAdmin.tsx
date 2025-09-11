import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Save, X, Package, RefreshCw } from 'lucide-react';
import { mealPlansApi } from '../../services/api';

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
  display_order?: number;
}

export default function MealPlansAdmin() {
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<MealPlan>>({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch meal plans on component mount
  useEffect(() => {
    fetchMealPlans();
  }, []);

  const fetchMealPlans = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await mealPlansApi.getAllAdmin();
      if (response.success) {
        setMealPlans(response.data);
      } else {
        setError(response.error || 'Failed to fetch meal plans');
      }
    } catch (err) {
      setError('Failed to fetch meal plans');
      console.error('Error fetching meal plans:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (plan: MealPlan) => {
    setEditingId(plan.id);
    setFormData(plan);
  };

  const handleSave = async () => {
    if (editingId) {
      try {
        setError(null);
        const response = await mealPlansApi.update(editingId, formData);
        if (response.success) {
          await fetchMealPlans();
          setEditingId(null);
          setFormData({});
        } else {
          setError(response.error || 'Failed to update meal plan');
        }
      } catch (err) {
        setError('Failed to update meal plan');
        console.error('Error updating meal plan:', err);
      }
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({});
    setShowAddForm(false);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this meal plan?')) {
      try {
        setError(null);
        const response = await mealPlansApi.delete(id);
        if (response.success) {
          await fetchMealPlans();
        } else {
          setError(response.error || 'Failed to delete meal plan');
        }
      } catch (err) {
        setError('Failed to delete meal plan');
        console.error('Error deleting meal plan:', err);
      }
    }
  };

  const handleAdd = async () => {
    if (formData.name && formData.number_of_meals && formData.original_cost) {
      try {
        setError(null);
        const response = await mealPlansApi.create({
          ...formData,
          discounted_price: formData.discounted_price || formData.original_cost,
        });
        if (response.success) {
          await fetchMealPlans();
          setShowAddForm(false);
          setFormData({});
        } else {
          setError(response.error || 'Failed to create meal plan');
        }
      } catch (err) {
        setError('Failed to create meal plan');
        console.error('Error creating meal plan:', err);
      }
    }
  };

  const calculateDiscountPercent = (original: number, discounted: number) => {
    return Math.round(((original - discounted) / original) * 100);
  };

  const handlePriceChange = (field: 'original_cost' | 'discounted_price', value: number) => {
    const newFormData = { ...formData, [field]: value };
    
    if (newFormData.original_cost && newFormData.discounted_price) {
      newFormData.discount_percent = calculateDiscountPercent(newFormData.original_cost, newFormData.discounted_price);
    }
    
    setFormData(newFormData);
  };

  return (
    <div className="pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-16 lg:pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 sm:mb-12"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                Meal Plans Management
              </h1>
              <p className="text-sm sm:text-lg text-gray-600">
                Add, edit, or remove meal plans as needed
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={fetchMealPlans}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold flex items-center space-x-2 transition-all duration-300"
                disabled={loading}
              >
                <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold flex items-center space-x-2 transition-all duration-300"
              >
                <Plus className="h-5 w-5" />
                <span>Add New Plan</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6"
          >
            <p className="text-red-700">{error}</p>
          </motion.div>
        )}

        {/* Add New Plan Form */}
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-8"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Meal Plan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Plan Name</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter plan name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Meals</label>
                <input
                  type="number"
                  value={formData.number_of_meals || ''}
                  onChange={(e) => setFormData({ ...formData, number_of_meals: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Original Cost (₹)</label>
                <input
                  type="number"
                  value={formData.original_cost || ''}
                  onChange={(e) => handlePriceChange('original_cost', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Discounted Price (₹)</label>
                <input
                  type="number"
                  value={formData.discounted_price || ''}
                  onChange={(e) => handlePriceChange('discounted_price', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Discount %</label>
                <input
                  type="number"
                  value={formData.discount_percent || ''}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50"
                  disabled
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Plan
              </button>
            </div>
          </motion.div>
        )}

        {/* Meal Plans Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pack Name
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    No. of Meals
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Original Cost
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Discounted Price
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Discount %
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading && (
                  <tr>
                    <td colSpan={7} className="text-center py-8">
                      <div className="flex justify-center items-center space-x-2">
                        <RefreshCw className="h-5 w-5 animate-spin text-gray-500" />
                        <span className="text-gray-500">Loading meal plans...</span>
                      </div>
                    </td>
                  </tr>
                )}
                {!loading && mealPlans.map((plan) => (
                  <tr key={plan.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      {editingId === plan.id ? (
                        <input
                          type="text"
                          value={formData.name || ''}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <div className="flex items-center">
                          <Package className="h-5 w-5 text-blue-500 mr-2" />
                          <div>
                            <span className="text-sm font-medium text-gray-900">{plan.name}</span>
                            {plan.is_trial && (
                              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                                Trial
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {editingId === plan.id ? (
                        <input
                          type="number"
                          value={formData.number_of_meals || ''}
                          onChange={(e) => setFormData({ ...formData, number_of_meals: parseInt(e.target.value) })}
                          className="w-20 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                        />
                      ) : (
                        <span className="text-sm text-gray-900">{plan.number_of_meals}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {editingId === plan.id ? (
                        <input
                          type="number"
                          value={formData.original_cost || ''}
                          onChange={(e) => handlePriceChange('original_cost', parseInt(e.target.value))}
                          className="w-24 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                        />
                      ) : (
                        <span className="text-sm text-gray-500 line-through">₹{plan.original_cost}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {editingId === plan.id ? (
                        <input
                          type="number"
                          value={formData.discounted_price || ''}
                          onChange={(e) => handlePriceChange('discounted_price', parseInt(e.target.value))}
                          className="w-24 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                        />
                      ) : (
                        <span className="text-sm font-semibold text-green-600">₹{plan.discounted_price}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {editingId === plan.id ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {formData.discount_percent}%
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {plan.discount_percent}%
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        plan.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {plan.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {editingId === plan.id ? (
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            onClick={handleSave}
                            className="text-green-600 hover:text-green-700"
                          >
                            <Save className="h-5 w-5" />
                          </button>
                          <button
                            onClick={handleCancel}
                            className="text-gray-600 hover:text-gray-700"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            onClick={() => handleEdit(plan)}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <Edit2 className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(plan.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Sample Menu Button Note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6"
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-blue-800">Sample Menu Button</h3>
              <p className="mt-1 text-sm text-blue-700">
                There would be a sample menu button that you can place at a convenient place on the main page or in the meals plans individually.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}