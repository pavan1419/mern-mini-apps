const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['inspiration', 'life', 'love', 'wisdom'],
    default: 'inspiration',
  },
  likes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Quote', quoteSchema);
