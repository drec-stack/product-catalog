import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import ProductCard from './ProductCard';
import Pagination from './Pagination';

const ProductList: React.FC = () => {
  const dispatch = useDispatch();
  const {
    filteredItems,
    currentPage,
    itemsPerPage,
    searchQuery,
    filterCategory,
    items
  } = useSelector((state: RootState) => state.products);

  const categories = Array.from(new Set(items.map(product => product.category)));

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Фильтры и поиск */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          {/* Поиск */}
          <div className="w-full md:w-auto">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          {/* Фильтры */}
          <div className="flex flex-wrap gap-2">
            <select
              value={filterCategory}
              onChange={(e) => dispatch(setFilterCategory(e.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Products</option>
              <option value="favorites">Favorites</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Список продуктов */}
      {currentItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {currentItems.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          {/* Пагинация */}
          <Pagination />
        </>
      )}
    </div>
  );
};

export default ProductList;