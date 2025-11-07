import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Product from './models/Product.js';

// Import route modules
import productRoutes from './routes/products.js';
import cartRoutes from './routes/cart.js';
import checkoutRoutes from './routes/checkout.js';

// Import middleware
import { errorHandler, notFound } from './middleware/errorHandler.js';

// Import sample data
import { samples } from './data/products.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ecom';

console.log('Connecting to MongoDB...');

// Connect DB
mongoose.connect(MONGODB_URI).then(async () => {
  console.log('Connected to MongoDB');
  // seed products if empty
  const count = await Product.countDocuments();
  if (count === 0) {
    console.log('Seeding sample products...');
    await Product.insertMany(samples);
    console.log('Products seeded');
  }
}).catch(err => console.error('MongoDB connection error', err));

// Use route modules
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkoutRoutes);

// Error handling middleware (must be after routes)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend server started on port ${PORT}`));
