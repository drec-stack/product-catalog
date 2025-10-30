import React from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { Product } from '../types/product';
import { toggleLike, deleteProduct } from '../store/productsSlice';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.action-button')) {
      router.push(`/products/${product.id}`);
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleLike(product.id));
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(deleteProduct(product.id));
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300 h-full flex flex-col"
      onClick={handleCardClick}
    >
      <div className="relative h-48 bg-gray-200">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 flex space-x-2">
          <button
            onClick={handleLike}
            className={`action-button p-2 rounded-full ${
              product.isLiked ? 'bg-red-500 text-white' : 'bg-white text-gray-600'
            } shadow-md hover:scale-110 transition-transform duration-200`}
          >
            {product.isLiked ? '❤️' : '🤍'}
          </button>
          <button
            onClick={handleDelete}
            className="action-button p-2 bg-white text-red-500 rounded-full shadow-md hover:scale-110 transition-transform duration-200"
          >
            🗑️
          </button>
        </div>
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
        <p className="text-gray-600 text-sm mb-2 flex-grow">
          {truncateText(product.description, 100)}
        </p>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-2xl font-bold text-green-600">${product.price}</span>
          <div className="flex items-center space-x-1">
            <span className="text-yellow-500">⭐</span>
            <span className="text-sm">{product.rating}</span>
          </div>
        </div>
        <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
          <span>{product.brand}</span>
          <span className={`px-2 py-1 rounded ${
            product.stock > 50 ? 'bg-green-100 text-green-800' : 
            product.stock > 10 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
          }`}>
            {product.stock} in stock
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;