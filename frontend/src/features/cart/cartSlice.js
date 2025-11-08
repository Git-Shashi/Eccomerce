import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getAuthHeaders } from '../../utils/auth'

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${API}/api/cart`, {
      headers: getAuthHeaders()
    })
    // Handle new API response format
    return res.data.data?.items || res.data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch cart')
  }
})

export const addOrUpdateCartItem = createAsyncThunk('cart/addOrUpdate', async ({ productId, quantity }, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${API}/api/cart`, 
      { productId, quantity },
      { headers: getAuthHeaders() }
    )
    // Handle new API response format
    return res.data.data || res.data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to add item to cart')
  }
})

export const removeCartItem = createAsyncThunk('cart/remove', async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${API}/api/cart/${id}`, {
      headers: getAuthHeaders()
    })
    return id
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to remove item')
  }
})

export const checkout = createAsyncThunk('cart/checkout', async ({ name, email }, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${API}/api/checkout`, 
      { name, email },
      { headers: getAuthHeaders() }
    )
    // Handle new API response format
    return res.data.data || res.data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Checkout failed')
  }
})

const cartSlice = createSlice({
  name: 'cart',
  initialState: { 
    items: [], 
    status: 'idle', 
    receipt: null,
    error: null 
  },
  reducers: {
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch cart
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchCart.fulfilled, (state, action) => { 
        state.items = action.payload
        state.status = 'succeeded'
        state.error = null
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      // Add/Update cart item
      .addCase(addOrUpdateCartItem.fulfilled, (state, action) => {
        const idx = state.items.findIndex(i => i._id === action.payload._id)
        if (idx >= 0) state.items[idx] = action.payload
        else state.items.push(action.payload)
        state.error = null
      })
      .addCase(addOrUpdateCartItem.rejected, (state, action) => {
        state.error = action.payload
      })
      // Remove cart item
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.items = state.items.filter(i => i._id !== action.payload)
        state.error = null
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.error = action.payload
      })
      // Checkout
      .addCase(checkout.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(checkout.fulfilled, (state, action) => {
        state.receipt = action.payload.receipt
        state.items = []
        state.status = 'succeeded'
        state.error = null
      })
      .addCase(checkout.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  }
})

export const { clearError } = cartSlice.actions
export default cartSlice.reducer
