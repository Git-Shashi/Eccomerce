import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  userId: { 
    type: String, 
    required: true,
    index: true // Add index for faster queries by userId
  },
  product: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true 
  },
  quantity: { 
    type: Number, 
    default: 1,
    min: [1, 'Quantity must be at least 1']
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Compound index to ensure one product per user
cartItemSchema.index({ userId: 1, product: 1 }, { unique: true });

export default mongoose.model('CartItem', cartItemSchema);
