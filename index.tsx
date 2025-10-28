import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setProducts } from '../../store/productsSlice';
import ProductList from '../../components/ProductList';
import Link from 'next/link';

const ProductsPage: React.FC = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    // Загрузка данных из API
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products?limit=100');
        const data = await response.json();
        dispatch(setProducts(data.products));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    if (items.length === 0) {
      fetchProducts();
    }
  }, [dispatch, items.length]);

  return (
    <div>
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <h1 className="text-3xl font-bold text-gray-900">Products Catalog</h1>
            <Link
              href="/create-product"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold"
            >
              + Add New Product
            </Link>
          </div>
        </div>
      </div>
      
      <ProductList />
    </div>
  );
};

export default ProductsPage;