import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${API}/api/products`)
    // Handle new API response format
    return res.data.data || res.data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch products')
  }
})

const productsSlice = createSlice({
  name: 'products',
  initialState: { 
    items: [], 
    status: 'idle',
    error: null 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { 
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => { 
        state.status = 'succeeded'
        state.items = action.payload
        state.error = null
      })
      .addCase(fetchProducts.rejected, (state, action) => { 
        state.status = 'failed'
        state.error = action.payload
      })
  }
})

export default productsSlice.reducer
