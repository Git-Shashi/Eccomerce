import express from 'express';
import Product from '../models/Product.js';
import { asyncHandler, AppError } from '../middleware/errorHandler.js';

const router = express.Router();

// Helper function to fetch products from Fake Store API
async function fetchFromFakeStoreAPI() {
  const response = await fetch('https://fakestoreapi.com/products');
  
  if (!response.ok) {
    throw new AppError('Failed to fetch products from Fake Store API', 502);
  }
  
  const products = await response.json();
  
  // Transform Fake Store API format to our schema
  return products.map(item => ({
    name: item.title,
    price: Math.round(item.price * 83), // Convert USD to INR (approximate)
    description: item.description,
    imageUrl: item.image,
    category: item.category
  }));
}

// Get all products
router.get('/', asyncHandler(async (req, res) => {
  console.log('📦 Fetching products...');
  const products = await Product.find();
  console.log(`✅ Found ${products.length} products`);
  
  res.status(200).json({
    status: 'success',
    results: products.length,
    data: products
  });
  console.log('📤 Response sent');
}));

// Seed products from Fake Store API
router.get('/seed', asyncHandler(async (req, res) => {
  // only allow in non-production by default
  if (process.env.NODE_ENV === 'production') {
    throw new AppError('Seeding is disabled in production environment', 403);
  }

  console.log('Fetching products from Fake Store API...');
  const products = await fetchFromFakeStoreAPI();
  
  console.log('Clearing existing products...');
  await Product.deleteMany();
  
  console.log('Inserting new products...');
  const inserted = await Product.insertMany(products);
  
  res.status(200).json({
    status: 'success',
    message: 'Products seeded from Fake Store API',
    count: inserted.length,
    source: 'fakestoreapi.com'
  });
}));

export default router;
