import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addOrUpdateCartItem } from '../features/cart/cartSlice'

export default function ProductsGrid() {
  const products = useSelector(state => state.products.items)
  const dispatch = useDispatch()

  const handleAddToCart = (product) => {
    dispatch(addOrUpdateCartItem({ productId: product._id, quantity: 1 }))
  }

  return (
    <section className="mb-12">
      <h2 className="text-4xl font-bold mb-8 text-gray-900">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <div 
            key={product._id} 
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
          >
            <img 
              src={product.imageUrl || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop'} 
              alt={product.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-5">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-blue-600">₹{product.price}</span>
                <button 
                  onClick={() => handleAddToCart(product)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-all active:scale-95"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
