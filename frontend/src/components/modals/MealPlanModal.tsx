import React from 'react';
import { X, Package, Clock, UtensilsCrossed, Users, Tag, Image as ImageIcon, Upload, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MealPlan {
  id: number;
  name: string;
  number_of_meals: number;
  original_cost: number;
  discounted_price: number;
  discount_percent: number;
  duration_days?: number;
  meal_type?: string;
  plan_type?: string;
  is_trial?: boolean;
  description?: string;
  image_url?: string;
}

interface MealPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: MealPlan | null;
  mode: 'view' | 'edit' | 'create';
  onSave?: (data: Partial<MealPlan>) => void;
  uploadingImage?: boolean;
  onImageUpload?: (file: File) => Promise<string | null>;
}

export function MealPlanModal({ 
  isOpen, 
  onClose, 
  plan, 
  mode, 
  onSave,
  uploadingImage = false,
  onImageUpload
}: MealPlanModalProps) {
  const [formData, setFormData] = React.useState<Partial<MealPlan>>({});
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (plan) {
      setFormData(plan);
      setImagePreview(plan.image_url || null);
    } else if (mode === 'create') {
      setFormData({});
      setImagePreview(null);
    }
  }, [plan, mode]);

  const handleSave = () => {
    if (onSave) {
      onSave(formData);
    }
  };

  const handlePriceChange = (field: 'original_cost' | 'discounted_price', value: number) => {
    const newFormData = { ...formData, [field]: value };
    
    if (newFormData.original_cost && newFormData.discounted_price) {
      newFormData.discount_percent = Math.round(((newFormData.original_cost - newFormData.discounted_price) / newFormData.original_cost) * 100);
    }
    
    setFormData(newFormData);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !onImageUpload) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    const imageUrl = await onImageUpload(file);
    if (imageUrl) {
      setFormData({ ...formData, image_url: imageUrl });
    }
  };

  const isReadOnly = mode === 'view';
  const title = mode === 'create' ? 'Create Meal Plan' : mode === 'edit' ? 'Edit Meal Plan' : 'Meal Plan Details';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm bg-opacity-50 z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6">
                {/* Image Section */}
                <div className="mb-6">
                  <div className="flex items-center space-x-4">
                    {imagePreview || formData.image_url ? (
                      <img 
                        src={imagePreview || formData.image_url} 
                        alt={formData.name || 'Meal plan'}
                        className="h-32 w-32 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="h-32 w-32 bg-gray-200 rounded-lg flex items-center justify-center">
                        <ImageIcon className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                    
                    {!isReadOnly && (
                      <div>
                        <label className="cursor-pointer">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            disabled={uploadingImage}
                          />
                          <div className="flex items-center space-x-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors">
                            {uploadingImage ? (
                              <RefreshCw className="h-5 w-5 animate-spin text-blue-500" />
                            ) : (
                              <Upload className="h-5 w-5 text-gray-500" />
                            )}
                            <span className="text-sm text-gray-600">
                              {uploadingImage ? 'Uploading...' : 'Change Image'}
                            </span>
                          </div>
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                {/* Form Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Plan Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <Package className="inline h-4 w-4 mr-1" />
                      Plan Name
                    </label>
                    <input
                      type="text"
                      value={formData.name || ''}
                      onChange={(e) => !isReadOnly && setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-3 py-2 border rounded-lg ${
                        isReadOnly ? 'bg-gray-50 border-gray-200' : 'border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                      }`}
                      readOnly={isReadOnly}
                      placeholder={!isReadOnly ? "Enter plan name" : ""}
                    />
                  </div>

                  {/* Number of Meals */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Number of Meals
                    </label>
                    <input
                      type="number"
                      value={formData.number_of_meals || ''}
                      onChange={(e) => !isReadOnly && setFormData({ ...formData, number_of_meals: parseInt(e.target.value) })}
                      className={`w-full px-3 py-2 border rounded-lg ${
                        isReadOnly ? 'bg-gray-50 border-gray-200' : 'border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                      }`}
                      readOnly={isReadOnly}
                      placeholder={!isReadOnly ? "0" : ""}
                    />
                  </div>

                  {/* Original Cost */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Original Cost (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.original_cost || ''}
                      onChange={(e) => !isReadOnly && handlePriceChange('original_cost', parseInt(e.target.value))}
                      className={`w-full px-3 py-2 border rounded-lg ${
                        isReadOnly ? 'bg-gray-50 border-gray-200' : 'border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                      }`}
                      readOnly={isReadOnly}
                      placeholder={!isReadOnly ? "0" : ""}
                    />
                  </div>

                  {/* Discounted Price */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Discounted Price (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.discounted_price || ''}
                      onChange={(e) => !isReadOnly && handlePriceChange('discounted_price', parseInt(e.target.value))}
                      className={`w-full px-3 py-2 border rounded-lg ${
                        isReadOnly ? 'bg-gray-50 border-gray-200' : 'border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                      }`}
                      readOnly={isReadOnly}
                      placeholder={!isReadOnly ? "0" : ""}
                    />
                  </div>

                  {/* Discount Percentage */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <Tag className="inline h-4 w-4 mr-1" />
                      Discount %
                    </label>
                    <input
                      type="number"
                      value={formData.discount_percent || ''}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50"
                      readOnly
                    />
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <Clock className="inline h-4 w-4 mr-1" />
                      Duration (Days)
                    </label>
                    {isReadOnly ? (
                      <input
                        type="text"
                        value={formData.duration_days ? `${formData.duration_days} days` : 'Not specified'}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50"
                        readOnly
                      />
                    ) : (
                      <select
                        value={formData.duration_days || ''}
                        onChange={(e) => setFormData({ ...formData, duration_days: e.target.value ? parseInt(e.target.value) : undefined })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Duration</option>
                        <option value="3">3 Days</option>
                        <option value="5">5 Days</option>
                        <option value="7">7 Days</option>
                        <option value="14">14 Days</option>
                        <option value="28">28 Days</option>
                      </select>
                    )}
                  </div>

                  {/* Meal Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <UtensilsCrossed className="inline h-4 w-4 mr-1" />
                      Meal Type
                    </label>
                    {isReadOnly ? (
                      <input
                        type="text"
                        value={formData.meal_type ? formData.meal_type.charAt(0).toUpperCase() + formData.meal_type.slice(1) : 'Not specified'}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50"
                        readOnly
                      />
                    ) : (
                      <select
                        value={formData.meal_type || ''}
                        onChange={(e) => setFormData({ ...formData, meal_type: e.target.value || undefined })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Type</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                        <option value="both">Both</option>
                      </select>
                    )}
                  </div>

                  {/* Plan Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <Users className="inline h-4 w-4 mr-1" />
                      Plan Type
                    </label>
                    {isReadOnly ? (
                      <input
                        type="text"
                        value={formData.plan_type ? formData.plan_type.charAt(0).toUpperCase() + formData.plan_type.slice(1) : 'Individual'}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50"
                        readOnly
                      />
                    ) : (
                      <select
                        value={formData.plan_type || ''}
                        onChange={(e) => setFormData({ ...formData, plan_type: e.target.value || undefined })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Plan</option>
                        <option value="individual">Individual</option>
                        <option value="couple">Couple</option>
                      </select>
                    )}
                  </div>
                </div>

                {/* Trial Plan Checkbox */}
                {!isReadOnly && (
                  <div className="mt-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.is_trial || false}
                        onChange={(e) => setFormData({ ...formData, is_trial: e.target.checked })}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Trial Plan</span>
                    </label>
                  </div>
                )}

                {/* Trial Badge for View Mode */}
                {isReadOnly && formData.is_trial && (
                  <div className="mt-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                      Trial Plan
                    </span>
                  </div>
                )}

                {/* Description */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={formData.description || ''}
                    onChange={(e) => !isReadOnly && setFormData({ ...formData, description: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg ${
                      isReadOnly ? 'bg-gray-50 border-gray-200' : 'border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    }`}
                    rows={4}
                    readOnly={isReadOnly}
                    placeholder={!isReadOnly ? "Enter plan description..." : "No description available"}
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end space-x-3 p-6 border-t">
                <button
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {isReadOnly ? 'Close' : 'Cancel'}
                </button>
                {!isReadOnly && (
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {mode === 'create' ? 'Create Plan' : 'Save Changes'}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}