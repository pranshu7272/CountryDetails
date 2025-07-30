import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice.js';
import countryReducer from '../features/countries/countrySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    countries: countryReducer, 
  },
});
