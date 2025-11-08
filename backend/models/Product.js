import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  imageUrl: { type: String },
  category: { type: String }, // Added category field for Fake Store API
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Product', productSchema);
