import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import SupplierService from '../../services/supplierService';

// Thunks for async actions
export const fetchSuppliers = createAsyncThunk('suppliers/fetch', async (_, { rejectWithValue }) => {
  try {
    const data = await SupplierService.fetchSuppliers();
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const submitSupplierData = createAsyncThunk('suppliers/submit', async (formData, { rejectWithValue }) => {
  try {
    const response = await SupplierService.submitSupplierData(formData);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const supplierSlice = createSlice({
  name: 'suppliers',
  initialState: {
    contactDetails: [],
    associatedSuppliers: [],
    supplierInfo: {
      companyName: '',
      addressLine1: '',
      addressLine2: '',
      state: '',
      country: '',
      zipcode: '',
    },
    status: 'idle',  // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    updateContactDetails: (state, action) => {
      state.contactDetails = action.payload;
    },
    updateAssociatedSuppliers: (state, action) => {
      state.associatedSuppliers = action.payload;
    },
    updateSupplierInfo: (state, action) => {
      state.supplierInfo = { ...state.supplierInfo, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuppliers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSuppliers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const data = action.payload;
        state.contactDetails = data.contactDetails || [];
        state.associatedSuppliers = data.AssociatedSuppliers || [];
        state.supplierInfo = {
          companyName: data.companyName || '',
          addressLine1: data.addressLine1 || '',
          addressLine2: data.addressLine2 || '',
          state: data.state || '',
          country: data.country || '',
          zipcode: data.zipcode || ''
        };
      })
      .addCase(fetchSuppliers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(submitSupplierData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(submitSupplierData.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(submitSupplierData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { updateContactDetails, updateAssociatedSuppliers, updateSupplierInfo } = supplierSlice.actions;

export default supplierSlice.reducer;
