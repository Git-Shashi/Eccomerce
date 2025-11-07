import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  const res = await axios.get(`${API}/api/cart`)
  return res.data
})

export const addOrUpdateCartItem = createAsyncThunk('cart/addOrUpdate', async ({ productId, quantity }) => {
  const res = await axios.post(`${API}/api/cart`, { productId, quantity })
  return res.data
})

export const removeCartItem = createAsyncThunk('cart/remove', async (id) => {
  await axios.delete(`${API}/api/cart/${id}`)
  return id
})

export const checkout = createAsyncThunk('cart/checkout', async ({ name, email }) => {
  const res = await axios.post(`${API}/api/checkout`, { name, email })
  return res.data
})

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], status: 'idle', receipt: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => { state.items = action.payload })
      .addCase(addOrUpdateCartItem.fulfilled, (state, action) => {
        // replace or add
        const idx = state.items.findIndex(i => i._id === action.payload._id)
        if (idx >= 0) state.items[idx] = action.payload
        else state.items.push(action.payload)
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.items = state.items.filter(i => i._id !== action.payload)
      })
      .addCase(checkout.fulfilled, (state, action) => {
        state.receipt = action.payload.receipt
        state.items = []
      })
  }
})

export default cartSlice.reducer
