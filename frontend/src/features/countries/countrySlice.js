// src/features/countries/countrySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// export const fetchCountries = createAsyncThunk(
//   'countries/fetchCountries',
//   async () => {
//     const response = await axios.get('https://restcountries.com/v3.1/all');
//     return response.data;
//   }
// );

export const fetchCountries = createAsyncThunk(
  'countries/fetchCountries',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:5000/api/get-all-countries');
      return response.data;
    } catch (err) {
      console.error('Fetch Error:', err);
      return rejectWithValue(err.response?.data?.error || 'Something went wrong');
    }
  }
);


export const fetchCountriesByName = createAsyncThunk(
  'countries/fetchCountriesByName',
  async (name) => {
    const response = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
    return response.data;
  }
);

const countrySlice = createSlice({
  name: 'countries',
  initialState: {
    countries: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch All Countries
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetch Countries By Name
      .addCase(fetchCountriesByName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountriesByName.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = action.payload;
      })
      .addCase(fetchCountriesByName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default countrySlice.reducer;
