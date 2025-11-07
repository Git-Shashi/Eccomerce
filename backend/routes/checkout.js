import express from 'express';
import CartItem from '../models/CartItem.js';

const router = express.Router();

// Process checkout
router.post('/', async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ message: 'name and email required' });

    const items = await CartItem.find().populate('product');
    const total = items.reduce((sum, it) => sum + it.product.price * it.quantity, 0);

    // Create a simple receipt
    const receipt = {
      orderId: Math.floor(100000 + Math.random() * 900000),
      name,
      email,
      items: items.map(it => ({ name: it.product.name, price: it.product.price, quantity: it.quantity })),
      total,
      date: new Date()
    };

    // clear cart
    await CartItem.deleteMany();

    res.json({ receipt });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Checkout failed' });
  }
});

export default router;
