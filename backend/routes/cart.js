import express from 'express';
import Product from '../models/Product.js';
import CartItem from '../models/CartItem.js';

const router = express.Router();

// Get all cart items
router.get('/', async (req, res) => {
  try {
    const items = await CartItem.find().populate('product');
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch cart' });
  }
});

// Add to cart or update quantity
router.post('/', async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId || !Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({ message: 'productId and positive integer quantity required' });
    }

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    let cartItem = await CartItem.findOne({ product: productId });
    if (cartItem) {
      // set quantity
      cartItem.quantity = quantity;
      await cartItem.save();
    } else {
      cartItem = new CartItem({ product: productId, quantity });
      await cartItem.save();
    }

    const populated = await cartItem.populate('product');
    res.status(201).json(populated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add to cart' });
  }
});

// Remove cart item
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await CartItem.findByIdAndDelete(id);
    res.json({ message: 'Item removed' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to remove item' });
  }
});

export default router;
