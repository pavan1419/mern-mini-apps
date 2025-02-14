require('dotenv').config();

module.exports = {
  CURRENCY_API_KEY:
    process.env.CURRENCY_API_KEY ||
    'fca_live_myAR5XzGL3q41VSQIoEPy8krHDWpMhkjYIjhVnMG',
  CURRENCY_API_URL: 'https://api.freecurrencyapi.com/v1',
};
