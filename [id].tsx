import React from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { toggleLike } from '../../store/productsSlice';
import Link from 'next/link';

const ProductDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  
  const product = useSelector((state: RootState) =>
    state.products.items.find(p => p.id === Number(id))
  );

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Link href="/products" className="text-blue-600 hover:text-blue-800">
          ← Back to Products
        </Link>
      </div>
    );
  }

  const handleLike = () => {
    dispatch(toggleLike(product.id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/products"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        ← Back to Products
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Изображения */}
          <div className="md:w-1/2">
            <div className="h-96 md:h-full">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex overflow-x-auto p-4 space-x-2">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  className="w-20 h-20 object-cover rounded border"
                />
              ))}
            </div>
          </div>

          {/* Информация о продукте */}
          <div className="md:w-1/2 p-8">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
              <button
                onClick={handleLike}
                className={`text-2xl p-2 rounded-full ${
                  product.isLiked ? 'text-red-500' : 'text-gray-400'
                } hover:scale-110 transition-transform duration-200`}
              >
                {product.isLiked ? '❤️' : '🤍'}
              </button>
            </div>

            <p className="text-gray-600 mb-6">{product.description}</p>

            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-4xl font-bold text-green-600">${product.price}</span>
                {product.discountPercentage > 0 && (
                  <span className="text-sm text-red-500 line-through">
                    ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                  </span>
                )}
              </div>

              {product.discountPercentage > 0 && (
                <span className="inline-block bg-red-100 text-red-800 px-2 py-1 rounded text-sm">
                  {product.discountPercentage}% OFF
                </span>
              )}

              <div className="flex items-center space-x-2">
                <span className="text-yellow-500 text-xl">⭐</span>
                <span className="text-lg font-semibold">{product.rating}</span>
                <span className="text-gray-500">•</span>
                <span className={`text-sm font-medium ${
                  product.stock > 50 ? 'text-green-600' : 
                  product.stock > 10 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {product.stock} in stock
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm mb-6">
              <div>
                <span className="font-semibold">Brand:</span>
                <span className="ml-2 text-gray-600">{product.brand}</span>
              </div>
              <div>
                <span className="font-semibold">Category:</span>
                <span className="ml-2 text-gray-600 capitalize">{product.category}</span>
              </div>
            </div>

            <div className="flex space-x-4">
              <Link
                href={`/create-product?edit=${product.id}`}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-center font-semibold"
              >
                Edit Product
              </Link>
              <button className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;