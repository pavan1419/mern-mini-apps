const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const connectDB = require('./db');
const errorHandler = require('./middleware/errorHandler');
const moneyRoutes = require('./routes/money');
const userRoutes = require('./routes/user');
const quotesRoutes = require('./routes/quotes');

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: { message: 'Too many requests', status: 429 },
  },
});
app.use('/api', limiter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/money', moneyRoutes);
app.use('/api/users', userRoutes);
app.use('/api/quotes', quotesRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      message: `Route not found: ${req.method} ${req.url}`,
      status: 404,
    },
  });
});

// Error handling middleware (should be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('\nAvailable endpoints:');
  console.log('Health Check:');
  console.log('- GET /health');

  console.log('\nMoney Routes:');
  console.log('- GET    /api/money/rates');
  console.log('- GET    /api/money/convert');
  console.log('- POST   /api/money/history');

  console.log('\nUser Routes:');
  console.log('- POST   /api/users/register');
  console.log('- POST   /api/users/login');
  console.log('- GET    /api/users/profile');
  console.log('- PUT    /api/users/profile');

  console.log('\nQuotes Routes:');
  console.log('- GET    /api/quotes/random');
  console.log('- GET    /api/quotes');
  console.log('- POST   /api/quotes');
  console.log('- PATCH  /api/quotes/:id/like');

  console.log('\nRate Limiting:');
  console.log('- All /api/* routes limited to 100 requests per 15 minutes');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

module.exports = app;
