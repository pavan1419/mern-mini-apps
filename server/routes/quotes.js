const express = require('express');
const router = express.Router();
const Quote = require('../models/Quote');

// Get a random quote
router.get('/random', async (req, res) => {
  try {
    const { category } = req.query;
    const query = category ? { category } : {};
    
    const count = await Quote.countDocuments(query);
    const random = Math.floor(Math.random() * count);
    
    const quote = await Quote.findOne(query).skip(random);
    
    if (!quote) {
      return res.status(404).json({ message: 'No quotes found' });
    }
    
    res.json(quote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all quotes with pagination and filtering
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, category } = req.query;
    const query = category ? { category } : {};

    const quotes = await Quote.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const count = await Quote.countDocuments(query);

    res.json({
      quotes,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new quote (protected route)
router.post('/', async (req, res) => {
  try {
    const quote = new Quote(req.body);
    const newQuote = await quote.save();
    res.status(201).json(newQuote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Like a quote
router.patch('/:id/like', async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);
    if (!quote) {
      return res.status(404).json({ message: 'Quote not found' });
    }
    
    quote.likes += 1;
    const updatedQuote = await quote.save();
    res.json(updatedQuote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;