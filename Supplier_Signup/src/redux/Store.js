import { configureStore } from '@reduxjs/toolkit';
import supplierReducer from './slices/supplierSlice'; // Adjust the path to match your project structure

const store = configureStore({
  reducer: {
    suppliers: supplierReducer,
  },
});

export default store;
