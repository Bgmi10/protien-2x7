import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Eye, RefreshCw, Image as ImageIcon } from 'lucide-react';
import { mealPlansApi, uploadApi } from '../../services/api';
import ProfileDropdown from '../../components/admin/ProfileDropdown';
import { MealPlanModal } from '../../components/modals/MealPlanModal';

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
  image_url?: string;
}

export default function MealPlansAdmin() {
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'view' | 'edit' | 'create'>('view');
  const [selectedPlan, setSelectedPlan] = useState<MealPlan | null>(null);

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

  const handleView = (plan: MealPlan) => {
    setSelectedPlan(plan);
    setModalMode('view');
    setModalOpen(true);
  };

  const handleEdit = (plan: MealPlan) => {
    setSelectedPlan(plan);
    setModalMode('edit');
    setModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedPlan(null);
    setModalMode('create');
    setModalOpen(true);
  };

  const handleSave = async (formData: Partial<MealPlan>) => {
    try {
      setError(null);
      let response;
      
      if (modalMode === 'create') {
        // Ensure is_trial is always sent
        const dataToSend = {
          ...formData,
          is_trial: formData.is_trial || false
        };
        response = await mealPlansApi.create(dataToSend);
      } else if (modalMode === 'edit' && selectedPlan) {
        response = await mealPlansApi.update(selectedPlan.id, formData);
      }
      
      if (response?.success) {
        await fetchMealPlans();
        setModalOpen(false);
        setSelectedPlan(null);
      } else {
        setError(response?.error || 'Failed to save meal plan');
      }
    } catch (err) {
      setError('Failed to save meal plan');
      console.error('Error saving meal plan:', err);
    }
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

  const handleImageUpload = async (file: File): Promise<string | null> => {
    try {
      setUploadingImage(true);
      const response = await uploadApi.uploadImage(file);
      if (response.success && response.url) {
        return response.url;
      }
      return null;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 mt-20"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleCreate}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg font-semibold flex items-center space-x-2 transition-all duration-300"
              >
                <Plus className="h-4 w-4" />
                <span>Add Plan</span>
              </button>
              <ProfileDropdown />
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

        {/* Simplified Meal Plans Table */}
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
                  <th className="px-4 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Plan Name
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Meals
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Discount
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
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
                    {/* Image */}
                    <td className="px-4 py-4 text-center">
                      {plan.image_url ? (
                        <img 
                          src={plan.image_url} 
                          alt={plan.name}
                          className="h-12 w-12 object-cover rounded-lg mx-auto"
                        />
                      ) : (
                        <div className="h-12 w-12 bg-gray-200 rounded-lg flex items-center justify-center mx-auto">
                          <ImageIcon className="h-6 w-6 text-gray-400" />
                        </div>
                      )}
                    </td>
                    
                    {/* Name with Trial Badge */}
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{plan.name}</div>
                          {plan.is_trial ?  (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 mt-1">
                              Trial
                            </span>
                          ) : ""}
                        </div>
                      </div>
                    </td>
                    
                    {/* Number of Meals */}
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm text-gray-900">{plan.number_of_meals}</span>
                    </td>
                    
                    {/* Price (showing discounted price) */}
                    <td className="px-6 py-4 text-center">
                      <div>
                        <span className="text-sm text-gray-500 line-through">₹{plan.original_cost}</span>
                        <div className="text-sm font-semibold text-green-600">₹{plan.discounted_price}</div>
                      </div>
                    </td>
                    
                    {/* Discount */}
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {plan.discount_percent}% OFF
                      </span>
                    </td>
                    
                    {/* Type */}
                    <td className="px-6 py-4 text-center">
                      <div className="text-xs text-gray-600">
                        {plan.meal_type && (
                          <div className="capitalize">{plan.meal_type}</div>
                        )}
                        {plan.duration_days && (
                          <div>{plan.duration_days} days</div>
                        )}
                      </div>
                    </td>
                    
                    {/* Actions */}
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleView(plan)}
                          className="text-gray-600 hover:text-gray-700 transition-colors"
                          title="View Details"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleEdit(plan)}
                          className="text-blue-600 hover:text-blue-700 transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(plan.id)}
                          className="text-red-600 hover:text-red-700 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!loading && mealPlans.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-8">
                      <p className="text-gray-500">No meal plans found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

       
      </div>

      {/* Meal Plan Modal */}
      <MealPlanModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedPlan(null);
        }}
        plan={selectedPlan}
        mode={modalMode}
        onSave={handleSave}
        uploadingImage={uploadingImage}
        onImageUpload={handleImageUpload}
      />
    </div>
  );
}