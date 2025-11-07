import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addOrUpdateCartItem } from '../features/cart/cartSlice'

export default function ProductsPage() {
  const products = useSelector(state => state.products.items)
  const dispatch = useDispatch()

  const onAdd = (product) => {
    dispatch(addOrUpdateCartItem({ productId: product._id, quantity: 1 }))
  }

  return (
    <section>
      <h3>Products</h3>
      <div className="products-grid">
        {products.map(p => (
          <div key={p._id} className="card">
            <div className="product-name">{p.name}</div>
            <div style={{ color: '#666', fontSize: 14 }}>{p.description}</div>
            <div style={{ marginTop: 8, fontWeight: 700 }}>${p.price}</div>
            <div style={{ marginTop: 10 }}>
              <button className="btn btn-primary" onClick={() => onAdd(p)}>Add</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
