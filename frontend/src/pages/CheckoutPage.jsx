import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { checkout } from '../features/cart/cartSlice'

export default function CheckoutPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const receipt = useSelector(state => state.cart.receipt)
  const dispatch = useDispatch()

  const onCheckout = () => {
    dispatch(checkout({ name: name || 'Guest', email: email || 'guest@example.com' }))
  }

  if (receipt) {
    return (
      <section>
        <h3>Order Confirmed ✅</h3>
        <div className="card">
          <div>Order #{receipt.orderId}</div>
          <div>Total: ${receipt.total}</div>
          <div>Date: {new Date(receipt.date).toLocaleString()}</div>
          <div>Thank you, {receipt.name}!</div>
        </div>
      </section>
    )
  }

  return (
    <section>
      <h3>Checkout</h3>
      <div className="card">
        <div style={{ marginBottom: 8 }}>
          <div>Name</div>
          <input value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div style={{ marginBottom: 8 }}>
          <div>Email</div>
          <input value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
          <button className="btn btn-primary" onClick={onCheckout}>Complete Purchase</button>
        </div>
      </div>
    </section>
  )
}
