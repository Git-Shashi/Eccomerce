import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from './features/products/productsSlice'
import { fetchCart } from './features/cart/cartSlice'
import Navbar from './components/Navbar'
import ProductsGrid from './components/ProductsGrid'
import CartSidebar from './components/CartSidebar'
import CheckoutModal from './components/CheckoutModal'
import AuthModal from './components/AuthModal'
import Footer from './components/Footer'

export default function App() {
  const dispatch = useDispatch()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [isAuthOpen, setIsAuthOpen] = useState(false)

  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(fetchCart())
  }, [dispatch])

  const handleAuthSuccess = () => {
    setIsAuthOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar 
        onCartClick={() => setIsCartOpen(true)} 
        onAuthClick={() => setIsAuthOpen(true)}
      />
      <div className="max-w-7xl mx-auto px-6 py-8 flex-grow">
        <ProductsGrid />
      </div>
      
      <Footer />

      {isCartOpen && (
        <CartSidebar 
          onClose={() => setIsCartOpen(false)} 
          onCheckout={() => {
            setIsCartOpen(false)
            setIsCheckoutOpen(true)
          }}
        />
      )}

      {isCheckoutOpen && (
        <CheckoutModal onClose={() => setIsCheckoutOpen(false)} />
      )}

      {isAuthOpen && (
        <AuthModal 
          onClose={() => setIsAuthOpen(false)}
          onSuccess={handleAuthSuccess}
        />
      )}
    </div>
  )
}
