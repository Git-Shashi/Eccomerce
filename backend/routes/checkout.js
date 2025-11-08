import express from 'express';
import CartItem from '../models/CartItem.js';
import { asyncHandler, ValidationError, AppError } from '../middleware/errorHandler.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();

// Apply authentication middleware
router.use(authenticateUser);

// Validate email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Process checkout for current user
router.post('/', asyncHandler(async (req, res) => {
  const userId = req.userId;
  const { name, email } = req.body;
  
  // Validation
  if (!name || name.trim().length === 0) {
    throw new ValidationError('Name is required');
  }
  
  if (!email || !isValidEmail(email)) {
    throw new ValidationError('Valid email address is required');
  }

  // Get cart items for current user only
  const items = await CartItem.find({ userId }).populate('product');
  
  if (items.length === 0) {
    throw new AppError('Cart is empty. Please add items before checkout', 400);
  }

  // Calculate total
  const total = items.reduce((sum, item) => {
    if (!item.product) {
      throw new AppError('Some cart items have invalid product references', 400);
    }
    return sum + item.product.price * item.quantity;
  }, 0);

  // Create receipt
  const receipt = {
    orderId: Math.floor(100000 + Math.random() * 900000).toString(),
    userId,
    name: name.trim(),
    email: email.toLowerCase().trim(),
    items: items.map(item => ({
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      subtotal: item.product.price * item.quantity
    })),
    total,
    date: new Date(),
    status: 'completed'
  };

  // Clear only this user's cart after successful checkout
  await CartItem.deleteMany({ userId });

  res.status(200).json({
    status: 'success',
    message: 'Checkout completed successfully',
    data: {
      receipt
    }
  });
}));

export default router;
