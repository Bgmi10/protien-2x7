import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Eye, RefreshCw, Image as ImageIcon } from 'lucide-react';
import { sampleMenuApi, uploadApi } from '../../services/api';
import ProfileDropdown from '../../components/admin/ProfileDropdown';
import { SampleMenuModal } from '../../components/modals/SampleMenuModal';

interface SampleMenuDish {
  id: number;
  dish_name: string;
  ingredients: string[] | string;
  quantity: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  sugar: number;
  fiber: number;
  image_url?: string;
  is_active: boolean;
  display_order?: number;
}

export default function SampleMenuAdmin() {
  const [dishes, setDishes] = useState<SampleMenuDish[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'view' | 'edit' | 'create'>('view');
  const [selectedDish, setSelectedDish] = useState<SampleMenuDish | null>(null);

  // Fetch dishes on component mount
  useEffect(() => {
    fetchDishes();
  }, []);

  const fetchDishes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await sampleMenuApi.getAllAdmin();
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

  const handleView = (dish: SampleMenuDish) => {
    setSelectedDish(dish);
    setModalMode('view');
    setModalOpen(true);
  };

  const handleEdit = (dish: SampleMenuDish) => {
    setSelectedDish(dish);
    setModalMode('edit');
    setModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedDish(null);
    setModalMode('create');
    setModalOpen(true);
  };

  const handleSave = async (formData: Partial<SampleMenuDish>) => {
    try {
      setError(null);
      let response;
      
      if (modalMode === 'create') {
        response = await sampleMenuApi.create(formData);
      } else if (modalMode === 'edit' && selectedDish) {
        response = await sampleMenuApi.update(selectedDish.id, formData);
      }
      
      if (response?.success) {
        await fetchDishes();
        setModalOpen(false);
        setSelectedDish(null);
      } else {
        setError(response?.error || 'Failed to save dish');
      }
    } catch (err) {
      console.error('Error saving dish:', err);
      setError('Failed to save dish');
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this dish?')) {
      try {
        setError(null);
        const response = await sampleMenuApi.delete(id);
        if (response.success) {
          await fetchDishes();
        } else {
          setError(response.error || 'Failed to delete dish');
        }
      } catch (err) {
        console.error('Error deleting dish:', err);
        setError('Failed to delete dish');
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
                <span>Add Dish</span>
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

        {/* Dishes Table */}
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
                    Dish Name
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Calories
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Protein
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Carbs
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fat
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
                    <td colSpan={9} className="text-center py-8">
                      <div className="flex justify-center items-center space-x-2">
                        <RefreshCw className="h-5 w-5 animate-spin text-gray-500" />
                        <span className="text-gray-500">Loading dishes...</span>
                      </div>
                    </td>
                  </tr>
                )}
                {!loading && dishes.map((dish) => (
                  <tr key={dish.id} className="hover:bg-gray-50 transition-colors">
                    {/* Image */}
                    <td className="px-4 py-4 text-center">
                      {dish.image_url ? (
                        <img 
                          src={dish.image_url} 
                          alt={dish.dish_name}
                          className="h-12 w-12 object-cover rounded-lg mx-auto"
                        />
                      ) : (
                        <div className="h-12 w-12 bg-gray-200 rounded-lg flex items-center justify-center mx-auto">
                          <ImageIcon className="h-6 w-6 text-gray-400" />
                        </div>
                      )}
                    </td>
                    
                    {/* Dish Name with Ingredients */}
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{dish.dish_name}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {Array.isArray(dish.ingredients) 
                            ? dish.ingredients.slice(0, 2).join(', ')
                            : 'No ingredients'}
                          {Array.isArray(dish.ingredients) && dish.ingredients.length > 2 && '...'}
                        </div>
                      </div>
                    </td>
                    
                    {/* Quantity */}
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm text-gray-900">{dish.quantity}</span>
                    </td>
                    
                    {/* Calories */}
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm font-semibold text-orange-600">{dish.calories}</span>
                    </td>
                    
                    {/* Protein */}
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm font-semibold text-blue-600">{dish.protein}g</span>
                    </td>
                    
                    {/* Carbs */}
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm text-gray-700">{dish.carbs}g</span>
                    </td>
                    
                    {/* Fat */}
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm text-gray-700">{dish.fat}g</span>
                    </td>
                    
                    {/* Status */}
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        dish.is_active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {dish.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    
                    {/* Actions */}
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleView(dish)}
                          className="text-gray-600 hover:text-gray-700 transition-colors"
                          title="View Details"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleEdit(dish)}
                          className="text-blue-600 hover:text-blue-700 transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(dish.id)}
                          className="text-red-600 hover:text-red-700 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!loading && dishes.length === 0 && (
                  <tr>
                    <td colSpan={9} className="text-center py-8">
                      <p className="text-gray-500">No dishes found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* Sample Menu Modal */}
      <SampleMenuModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedDish(null);
        }}
        dish={selectedDish}
        mode={modalMode}
        onSave={handleSave}
        uploadingImage={uploadingImage}
        onImageUpload={handleImageUpload}
      />
    </div>
  );
}