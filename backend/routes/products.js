import express from 'express';
import Product from '../models/Product.js';
import { samples } from '../data/products.js';

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});

// Development helper: reseed products collection
router.get('/seed', async (req, res) => {
  try {
    // only allow in non-production by default
    if (process.env.NODE_ENV === 'production') {
      return res.status(403).json({ message: 'Seeding disabled in production' });
    }
    await Product.deleteMany();
    const inserted = await Product.insertMany(samples);
    res.json({ message: 'Products re-seeded', count: inserted.length });
  } catch (err) {
    console.error('Reseed failed', err);
    res.status(500).json({ message: 'Reseed failed' });
  }
});

export default router;
