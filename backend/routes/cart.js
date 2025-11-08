import express from 'express';
import Product from '../models/Product.js';
import CartItem from '../models/CartItem.js';
import { asyncHandler, ValidationError, NotFoundError } from '../middleware/errorHandler.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();

// Apply authentication middleware to all cart routes
router.use(authenticateUser);

// Get cart items for current user
router.get('/', asyncHandler(async (req, res) => {
  const userId = req.userId;
  
  const items = await CartItem.find({ userId }).populate('product');
  
  // Calculate total
  const total = items.reduce((sum, item) => {
    return sum + (item.product ? item.product.price * item.quantity : 0);
  }, 0);
  
  res.status(200).json({
    status: 'success',
    results: items.length,
    data: {
      items,
      total,
      userId
    }
  });
}));

// Add to cart or update quantity for current user
router.post('/', asyncHandler(async (req, res) => {
  const userId = req.userId;
  const { productId, quantity } = req.body;
  
  // Validation
  if (!productId) {
    throw new ValidationError('Product ID is required');
  }
  
  if (!Number.isInteger(quantity) || quantity < 1) {
    throw new ValidationError('Quantity must be a positive integer');
  }

  // Check if product exists
  const product = await Product.findById(productId);
  if (!product) {
    throw new NotFoundError('Product not found');
  }

  // Find or create cart item for this user
  let cartItem = await CartItem.findOne({ userId, product: productId });
  
  if (cartItem) {
    cartItem.quantity = quantity;
    await cartItem.save();
  } else {
    cartItem = new CartItem({ userId, product: productId, quantity });
    await cartItem.save();
  }

  const populated = await cartItem.populate('product');
  
  res.status(201).json({
    status: 'success',
    message: 'Item added to cart',
    data: populated
  });
}));

// Remove cart item (only if it belongs to current user)
router.delete('/:id', asyncHandler(async (req, res) => {
  const userId = req.userId;
  const { id } = req.params;
  
  // Find and delete only if it belongs to the current user
  const cartItem = await CartItem.findOneAndDelete({ _id: id, userId });
  
  if (!cartItem) {
    throw new NotFoundError('Cart item not found or does not belong to you');
  }
  
  res.status(200).json({
    status: 'success',
    message: 'Item removed from cart'
  });
}));

export default router;
