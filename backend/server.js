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

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection string with fallback to local
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ecom';
const isAtlas = MONGODB_URI.includes('mongodb.net');

console.log(`🔌 Connecting to MongoDB (${isAtlas ? 'Atlas Cloud' : 'Local'})...`);

// Helper function to fetch and seed products from Fake Store API
async function seedFromFakeStoreAPI() {
  try {
    console.log('Fetching products from Fake Store API...');
    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();
    
    // Transform Fake Store API format to our schema
    const transformedProducts = products.map(item => ({
      name: item.title,
      price: Math.round(item.price * 83), // Convert USD to INR (approximate)
      description: item.description,
      imageUrl: item.image,
      category: item.category
    }));
    
    await Product.insertMany(transformedProducts);
    console.log(`Seeded ${transformedProducts.length} products from Fake Store API`);
  } catch (error) {
    console.error('Failed to seed from Fake Store API:', error.message);
    console.log('Skipping initial seed...');
  }
}

// MongoDB connection with retry logic
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
    });
    console.log('✅ Connected to MongoDB successfully');
    
    // Seed products if database is empty
    const count = await Product.countDocuments();
    if (count === 0) {
      console.log('Database is empty, seeding products from Fake Store API...');
      await seedFromFakeStoreAPI();
    }
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    console.log('⚠️  Server will continue running without database connection');
    console.log('⚠️  Please check your MongoDB connection string and network');
  }
};

// Connect to database
connectDB();

// Mongoose connection event handlers
mongoose.connection.on('disconnected', () => {
  console.log('⚠️  MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB error:', err.message);
});

// Use route modules
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkoutRoutes);

// Error handling middleware (must be after routes)
app.use(notFound);
app.use(errorHandler);

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received. Shutting down gracefully...');
  mongoose.connection.close(false, () => {
    console.log('MongoDB connection closed');
    process.exit(0);
  });
});

const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Backend server started on port ${PORT}`);
  console.log(`📍 API available at http://localhost:${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});
