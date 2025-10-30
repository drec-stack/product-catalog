import React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import ProductForm from '../components/ProductForm';

const CreateProductPage: React.FC = () => {
  const router = useRouter();
  const { edit } = router.query;
  
  const product = useSelector((state: RootState) =>
    state.products.items.find(p => p.id === Number(edit))
  );

  return (
    <div>
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {product ? 'Edit Product' : 'Create New Product'}
          </h1>
        </div>
      </div>
      
      <ProductForm product={product} isEdit={!!product} />
    </div>
  );
};

export default CreateProductPage;