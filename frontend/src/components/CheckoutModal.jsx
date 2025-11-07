import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkout } from '../features/cart/cartSlice'

export default function CheckoutModal({ onClose }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const receipt = useSelector(state => state.cart.receipt)
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(checkout({ name, email }))
  }

  if (receipt) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div className="bg-white rounded-2xl max-w-lg w-full p-8 animate-fade-in" onClick={(e) => e.stopPropagation()}>
          <div className="text-center">
            <div className="text-7xl mb-4">✅</div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Order Confirmed!</h2>
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Order ID:</span>
                  <span className="font-semibold">#{receipt.orderId}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-semibold">{receipt.name}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-semibold">{receipt.email}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-semibold">{new Date(receipt.date).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between py-3 pt-4 border-t-2 text-xl font-bold">
                  <span>Total Paid:</span>
                  <span className="text-green-600">₹{receipt.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold text-lg transition-all"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-lg w-full animate-fade-in" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <input 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter your name"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none transition-all"
              />
            </div>
          </div>
          
          <div className="p-6 border-t flex gap-3">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all"
            >
              Complete Order
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
