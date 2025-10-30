import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductFormData } from '../types/product';

interface ProductsState {
  items: Product[];
  filteredItems: Product[];
  favorites: number[];
  currentPage: number;
  itemsPerPage: number;
  searchQuery: string;
  filterCategory: string;
}

const initialState: ProductsState = {
  items: [],
  filteredItems: [],
  favorites: [],
  currentPage: 1,
  itemsPerPage: 8,
  searchQuery: '',
  filterCategory: 'all',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload.map(product => ({
        ...product,
        isLiked: state.favorites.includes(product.id),
      }));
      state.filteredItems = state.items;
    },
    toggleLike: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const product = state.items.find(p => p.id === productId);
      
      if (product) {
        product.isLiked = !product.isLiked;
        
        if (product.isLiked) {
          state.favorites.push(productId);
        } else {
          state.favorites = state.favorites.filter(id => id !== productId);
        }
      }
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      state.items = state.items.filter(p => p.id !== productId);
      state.favorites = state.favorites.filter(id => id !== productId);
    },
    addProduct: (state, action: PayloadAction<ProductFormData>) => {
      const newProduct: Product = {
        id: Date.now(),
        ...action.payload,
        discountPercentage: 0,
        rating: 0,
        stock: 0,
        images: [action.payload.thumbnail],
        isLiked: false,
      };
      state.items.unshift(newProduct);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.items.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.currentPage = 1;
      this.filterProducts(state);
    },
    setFilterCategory: (state, action: PayloadAction<string>) => {
      state.filterCategory = action.payload;
      state.currentPage = 1;
      this.filterProducts(state);
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    filterProducts: (state) => {
      let filtered = state.items;
      
      if (state.searchQuery) {
        filtered = filtered.filter(product =>
          product.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(state.searchQuery.toLowerCase())
        );
      }
      
      if (state.filterCategory === 'favorites') {
        filtered = filtered.filter(product => product.isLiked);
      } else if (state.filterCategory !== 'all') {
        filtered = filtered.filter(product => product.category === state.filterCategory);
      }
      
      state.filteredItems = filtered;
    },
  },
});

export const {
  setProducts,
  toggleLike,
  deleteProduct,
  addProduct,
  updateProduct,
  setSearchQuery,
  setFilterCategory,
  setCurrentPage,
  filterProducts,
} = productsSlice.actions;

export default productsSlice.reducer;