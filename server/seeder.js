require('dotenv').config();
const mongoose = require('mongoose');
const Quote = require('./models/Quote');
const quotes = require('./data/sampleQuotes');

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    await Quote.deleteMany();
    console.log('Deleted existing quotes');

    await Quote.insertMany(quotes);
    console.log('Added sample quotes');

    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();
