import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { auth } from '../firebase/config'
import { signOut, onAuthStateChanged } from 'firebase/auth'

export default function Navbar({ onCartClick, onAuthClick }) {
  const cartItems = useSelector(state => state.cart.items)
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const [user, setUser] = useState(null)
  const [showUserMenu, setShowUserMenu] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [])

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      setShowUserMenu(false)
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-600 flex items-center gap-2">
          🛍️ Ecom Store
        </div>
        
        <div className="flex items-center gap-4">
          {/* User Icon/Menu */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-all"
              >
                {user.photoURL ? (
                  <img src={user.photoURL} alt="User" className="w-8 h-8 rounded-full" />
                ) : (
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {user.email?.[0].toUpperCase()}
                  </div>
                )}
                <span className="font-semibold text-gray-700 hidden sm:block">
                  {user.displayName || user.email?.split('@')[0]}
                </span>
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="text-sm font-semibold text-gray-900">{user.displayName || 'User'}</p>
                    <p className="text-xs text-gray-600 truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-all"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onAuthClick}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2.5 rounded-lg font-semibold transition-all flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Sign In
            </button>
          )}

          {/* Cart Button */}
          <button 
            onClick={onCartClick}
            className="relative bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold transition-all hover:-translate-y-0.5 flex items-center gap-2"
          >
            🛒 Cart
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  )
}
