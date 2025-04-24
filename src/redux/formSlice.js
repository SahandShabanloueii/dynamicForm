import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: {},
  loading: false,
  error: null,
  success: false
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
    resetForm: () => {
      return initialState;
    }
  }
});

export const { setFormData, setLoading, setError, setSuccess, resetForm } = formSlice.actions;
export default formSlice.reducer; 