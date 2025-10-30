import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { Product, ProductFormData } from '../types/product';
import { addProduct, updateProduct } from '../store/productsSlice';

interface ProductFormProps {
  product?: Product;
  isEdit?: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, isEdit = false }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<ProductFormData>({
    title: product?.title || '',
    description: product?.description || '',
    price: product?.price || 0,
    brand: product?.brand || '',
    category: product?.category || '',
    thumbnail: product?.thumbnail || '',
  });

  const [errors, setErrors] = useState<Partial<ProductFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<ProductFormData> = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.price <= 0) newErrors.price = 'Price must be greater than 0';
    if (!formData.brand.trim()) newErrors.brand = 'Brand is required';
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    if (!formData.thumbnail.trim()) newErrors.thumbnail = 'Image URL is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      if (isEdit && product) {
        dispatch(updateProduct({ ...product, ...formData }));
      } else {
        dispatch(addProduct(formData));
      }
      router.push('/products');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value,
    }));
  };

  const categories = [
    'smartphones', 'laptops', 'fragrances', 'skincare', 'groceries',
    'home-decoration', 'furniture', 'tops', 'womens-dresses', 'womens-shoes',
    'mens-shirts', 'mens-shoes', 'mens-watches', 'womens-watches', 'womens-bags',
    'womens-jewellery', 'sunglasses', 'automotive', 'motorcycle', 'lighting'
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        {isEdit ? 'Edit Product' : 'Create New Product'}
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter product title"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter product description"
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              min="0"
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.price ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="0.00"
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Brand *
            </label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.brand ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter brand name"
            />
            {errors.brand && <p className="text-red-500 text-sm mt-1">{errors.brand}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.category ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image URL *
            </label>
            <input
              type="url"
              name="thumbnail"
              value={formData.thumbnail}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.thumbnail ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="https://example.com/image.jpg"
            />
            {errors.thumbnail && <p className="text-red-500 text-sm mt-1">{errors.thumbnail}</p>}
          </div>
        </div>

        {formData.thumbnail && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image Preview
            </label>
            <img
              src={formData.thumbnail}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-lg border"
            />
          </div>
        )}

        <div className="flex space-x-4 pt-6">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold"
          >
            {isEdit ? 'Update Product' : 'Create Product'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/products')}
            className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors duration-200 font-semibold"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;