import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addOrUpdateCartItem, removeCartItem } from '../features/cart/cartSlice'

export default function CartSidebar({ onClose, onCheckout }) {
  const cartItems = useSelector(state => state.cart.items)
  const dispatch = useDispatch()

  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  const handleIncrease = (item) => {
    dispatch(addOrUpdateCartItem({ productId: item.product._id, quantity: item.quantity + 1 }))
  }

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      dispatch(addOrUpdateCartItem({ productId: item.product._id, quantity: item.quantity - 1 }))
    }
  }

  const handleRemove = (item) => {
    dispatch(removeCartItem(item._id))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end" onClick={onClose}>
      <div 
        className="bg-white w-full max-w-md h-full flex flex-col animate-slide-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:bg-gray-100 rounded-lg w-10 h-10 flex items-center justify-center text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <div className="text-7xl mb-4">🛒</div>
              <p className="text-lg">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map(item => (
                <div key={item._id} className="flex gap-4 pb-4 border-b">
                  <img 
                    src={item.product.imageUrl || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop'} 
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{item.product.name}</h3>
                    <p className="text-gray-600 mb-3">₹{item.product.price}</p>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => handleDecrease(item)}
                        className="bg-gray-100 hover:bg-gray-200 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-lg"
                      >
                        −
                      </button>
                      <span className="font-semibold min-w-[40px] text-center">{item.quantity}</span>
                      <button 
                        onClick={() => handleIncrease(item)}
                        className="bg-gray-100 hover:bg-gray-200 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-lg"
                      >
                        +
                      </button>
                      <button 
                        onClick={() => handleRemove(item)}
                        className="ml-auto bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-lg text-sm font-semibold"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t-2 p-6 bg-white">
            <div className="flex justify-between items-center mb-4 text-xl font-bold">
              <span>Total:</span>
              <span className="text-blue-600">₹{total.toFixed(2)}</span>
            </div>
            <button 
              onClick={onCheckout}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg font-semibold text-lg transition-all"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
