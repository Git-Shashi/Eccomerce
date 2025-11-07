import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchProducts } from './features/products/productsSlice'
import { fetchCart } from './features/cart/cartSlice'
import ProductsPage from './pages/ProductsPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'

export default function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(fetchCart())
  }, [dispatch])

  return (
    <div>
      <header className="app-header">
        <div className="container">
          <h2 style={{ display: 'inline' }}>🛒 Ecom</h2>
        </div>
      </header>
      <div className="container">
        <ProductsPage />
        <div className="spacer" />
        <CartPage />
        <div className="spacer" />
        <CheckoutPage />
      </div>
    </div>
  )
}
