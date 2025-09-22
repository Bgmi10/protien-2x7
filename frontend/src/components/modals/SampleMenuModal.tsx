import React from 'react';
import { X, UtensilsCrossed, Plus, Trash2, Image as ImageIcon, Upload, RefreshCw, Scale, Zap, Wheat, Droplet, Cookie, Leaf } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SampleMenuDish {
  id?: number;
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
  is_active?: boolean;
  display_order?: number;
}

interface SampleMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'view' | 'edit' | 'create';
  dish: SampleMenuDish | null;
  onSave: (data: Partial<SampleMenuDish>) => Promise<void>;
  onImageUpload?: (file: File) => Promise<string | null>;
  uploadingImage?: boolean;
}

export function SampleMenuModal({
  isOpen,
  onClose,
  mode,
  dish,
  onSave,
  onImageUpload,
  uploadingImage = false
}: SampleMenuModalProps) {
  const [formData, setFormData] = React.useState<Partial<SampleMenuDish>>({
    dish_name: '',
    ingredients: [],
    quantity: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    sugar: 0,
    fiber: 0,
    is_active: true,
    display_order: 0
  });
  
  const [ingredientInput, setIngredientInput] = React.useState('');
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (dish) {
      setFormData({
        ...dish,
        ingredients: Array.isArray(dish.ingredients) ? dish.ingredients : []
      });
      setImagePreview(dish.image_url || null);
    } else if (mode === 'create') {
      setFormData({
        dish_name: '',
        ingredients: [],
        quantity: '',
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        sugar: 0,
        fiber: 0,
        is_active: true,
        display_order: 0
      });
      setImagePreview(null);
    }
  }, [dish, mode]);

  const handleAddIngredient = () => {
    if (ingredientInput.trim()) {
      const currentIngredients = Array.isArray(formData.ingredients) ? formData.ingredients : [];
      setFormData({
        ...formData,
        ingredients: [...currentIngredients, ingredientInput.trim()]
      });
      setIngredientInput('');
    }
  };

  const handleRemoveIngredient = (index: number) => {
    const currentIngredients = Array.isArray(formData.ingredients) ? formData.ingredients : [];
    setFormData({
      ...formData,
      ingredients: currentIngredients.filter((_, i) => i !== index)
    });
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

  const handleSave = async () => {
    setError(null);
    
    // Validation
    if (!formData.dish_name) {
      setError('Dish name is required');
      return;
    }
    
    const ingredients = Array.isArray(formData.ingredients) ? formData.ingredients : [];
    if (ingredients.length === 0) {
      setError('At least one ingredient is required');
      return;
    }
    
    if (!formData.quantity) {
      setError('Quantity is required');
      return;
    }
    
    try {
      setSaving(true);
      await onSave(formData);
      onClose();
    } catch (err) {
      setError('Failed to save dish');
    } finally {
      setSaving(false);
    }
  };

  const isReadOnly = mode === 'view';
  const title = mode === 'create' ? 'Create Dish' : mode === 'edit' ? 'Edit Dish' : 'Dish Details';

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
                {error && (
                  <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                    {error}
                  </div>
                )}

                {/* Image Section */}
                <div className="mb-6">
                  <div className="flex items-center space-x-4">
                    {imagePreview || formData.image_url ? (
                      <img 
                        src={imagePreview || formData.image_url} 
                        alt={formData.dish_name || 'Dish'}
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
                  {/* Dish Name */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <UtensilsCrossed className="inline h-4 w-4 mr-1" />
                      Dish Name
                    </label>
                    <input
                      type="text"
                      value={formData.dish_name || ''}
                      onChange={(e) => !isReadOnly && setFormData({ ...formData, dish_name: e.target.value })}
                      className={`w-full px-3 py-2 border rounded-lg ${
                        isReadOnly ? 'bg-gray-50 border-gray-200' : 'border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                      }`}
                      readOnly={isReadOnly}
                      placeholder={!isReadOnly ? "Enter dish name" : ""}
                    />
                  </div>

                  {/* Quantity */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <Scale className="inline h-4 w-4 mr-1" />
                      Quantity
                    </label>
                    <input
                      type="text"
                      value={formData.quantity || ''}
                      onChange={(e) => !isReadOnly && setFormData({ ...formData, quantity: e.target.value })}
                      className={`w-full px-3 py-2 border rounded-lg ${
                        isReadOnly ? 'bg-gray-50 border-gray-200' : 'border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                      }`}
                      readOnly={isReadOnly}
                      placeholder={!isReadOnly ? "e.g., 350g" : ""}
                    />
                  </div>

                  {/* Ingredients Section */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ingredients
                    </label>
                    {!isReadOnly && (
                      <div className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={ingredientInput}
                          onChange={(e) => setIngredientInput(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddIngredient())}
                          placeholder="Add ingredient"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          type="button"
                          onClick={handleAddIngredient}
                          className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Plus className="h-5 w-5" />
                        </button>
                      </div>
                    )}
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {Array.isArray(formData.ingredients) && formData.ingredients.map((ingredient, index) => (
                        <div key={index} className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg">
                          <span className="text-sm text-gray-700">{ingredient}</span>
                          {!isReadOnly && (
                            <button
                              type="button"
                              onClick={() => handleRemoveIngredient(index)}
                              className="p-1 hover:bg-red-50 rounded transition-colors"
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </button>
                          )}
                        </div>
                      ))}
                      {(!formData.ingredients || (Array.isArray(formData.ingredients) && formData.ingredients.length === 0)) && (
                        <p className="text-sm text-gray-500 italic">No ingredients added</p>
                      )}
                    </div>
                  </div>

                  {/* Nutritional Information */}
                  <div className="md:col-span-2">
                    <h3 className="text-sm font-medium text-gray-700 mb-3 border-b pb-1">Nutritional Information</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {/* Calories */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          <Zap className="inline h-4 w-4 mr-1 text-orange-500" />
                          Calories
                        </label>
                        <input
                          type="number"
                          value={formData.calories || 0}
                          onChange={(e) => !isReadOnly && setFormData({ ...formData, calories: parseFloat(e.target.value) || 0 })}
                          className={`w-full px-3 py-2 border rounded-lg ${
                            isReadOnly ? 'bg-gray-50 border-gray-200' : 'border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                          }`}
                          readOnly={isReadOnly}
                        />
                      </div>

                      {/* Protein */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          <div className="inline-flex items-center">
                            <span className="text-blue-500 font-bold mr-1">P</span>
                            Protein (g)
                          </div>
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={formData.protein || 0}
                          onChange={(e) => !isReadOnly && setFormData({ ...formData, protein: parseFloat(e.target.value) || 0 })}
                          className={`w-full px-3 py-2 border rounded-lg ${
                            isReadOnly ? 'bg-gray-50 border-gray-200' : 'border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                          }`}
                          readOnly={isReadOnly}
                        />
                      </div>

                      {/* Carbs */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          <Wheat className="inline h-4 w-4 mr-1 text-amber-600" />
                          Carbs (g)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={formData.carbs || 0}
                          onChange={(e) => !isReadOnly && setFormData({ ...formData, carbs: parseFloat(e.target.value) || 0 })}
                          className={`w-full px-3 py-2 border rounded-lg ${
                            isReadOnly ? 'bg-gray-50 border-gray-200' : 'border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                          }`}
                          readOnly={isReadOnly}
                        />
                      </div>

                      {/* Fat */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          <Droplet className="inline h-4 w-4 mr-1 text-yellow-500" />
                          Fat (g)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={formData.fat || 0}
                          onChange={(e) => !isReadOnly && setFormData({ ...formData, fat: parseFloat(e.target.value) || 0 })}
                          className={`w-full px-3 py-2 border rounded-lg ${
                            isReadOnly ? 'bg-gray-50 border-gray-200' : 'border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                          }`}
                          readOnly={isReadOnly}
                        />
                      </div>

                      {/* Sugar */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          <Cookie className="inline h-4 w-4 mr-1 text-pink-500" />
                          Sugar (g)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={formData.sugar || 0}
                          onChange={(e) => !isReadOnly && setFormData({ ...formData, sugar: parseFloat(e.target.value) || 0 })}
                          className={`w-full px-3 py-2 border rounded-lg ${
                            isReadOnly ? 'bg-gray-50 border-gray-200' : 'border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                          }`}
                          readOnly={isReadOnly}
                        />
                      </div>

                      {/* Fiber */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          <Leaf className="inline h-4 w-4 mr-1 text-green-500" />
                          Fiber (g)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={formData.fiber || 0}
                          onChange={(e) => !isReadOnly && setFormData({ ...formData, fiber: parseFloat(e.target.value) || 0 })}
                          className={`w-full px-3 py-2 border rounded-lg ${
                            isReadOnly ? 'bg-gray-50 border-gray-200' : 'border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                          }`}
                          readOnly={isReadOnly}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Status and Display Order */}
                  {!isReadOnly && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Status
                        </label>
                        <select
                          value={formData.is_active ? 'active' : 'inactive'}
                          onChange={(e) => setFormData({ ...formData, is_active: e.target.value === 'active' })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Display Order
                        </label>
                        <input
                          type="number"
                          value={formData.display_order || 0}
                          onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </>
                  )}

                  {/* Status Badge for View Mode */}
                  {isReadOnly && (
                    <div className="md:col-span-2">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        formData.is_active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {formData.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  )}
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
                    disabled={saving}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : mode === 'create' ? 'Create Dish' : 'Save Changes'}
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