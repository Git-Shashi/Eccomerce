import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addOrUpdateCartItem, removeCartItem } from '../features/cart/cartSlice'

export default function CartPage() {
  const items = useSelector(state => state.cart.items)
  const dispatch = useDispatch()

  const onDecrease = (item) => {
    const newQty = Math.max(1, item.quantity - 1)
    dispatch(addOrUpdateCartItem({ productId: item.product._id, quantity: newQty }))
  }

  const onIncrease = (item) => {
    dispatch(addOrUpdateCartItem({ productId: item.product._id, quantity: item.quantity + 1 }))
  }

  const onRemove = (item) => {
    dispatch(removeCartItem(item._id))
  }

  const total = items.reduce((sum, it) => sum + it.product.price * it.quantity, 0)

  return (
    <section>
      <h3>Shopping Cart</h3>
      <div className="cart-list">
        {items.length === 0 && <div>Your cart is empty</div>}
        {items.map(it => (
          <div key={it._id} className="cart-row">
            <div>
              <div style={{ fontWeight: 600 }}>{it.product.name}</div>
              <div style={{ color: '#666' }}>${it.product.price}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div>Qty: {it.quantity}</div>
              <div style={{ marginTop: 6 }}>
                <button className="btn" onClick={() => onDecrease(it)}>-</button>
                <button className="btn" onClick={() => onIncrease(it)}>+</button>
                <button className="btn" onClick={() => onRemove(it)} style={{ marginLeft: 8 }}>Remove</button>
              </div>
            </div>
          </div>
        ))}
        <div style={{ textAlign: 'right', marginTop: 12, fontWeight: 700 }}>Total: ${total}</div>
      </div>
    </section>
  )
}
