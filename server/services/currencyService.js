const axios = require('axios');
const config = require('../config/config');

class CurrencyService {
  constructor() {
    this.apiKey = config.CURRENCY_API_KEY;
    this.baseUrl = config.CURRENCY_API_URL;
    this.cache = {
      rates: null,
      lastUpdated: null
    };
  }

  async getRates() {
    try {
      // Check cache (refresh every hour)
      if (this.cache.rates && this.cache.lastUpdated > Date.now() - 3600000) {
        return this.cache.rates;
      }

      const response = await axios.get(`${this.baseUrl}/latest`, {
        params: {
          apikey: this.apiKey
        }
      });

      this.cache.rates = response.data.data;
      this.cache.lastUpdated = Date.now();
      return this.cache.rates;
    } catch (error) {
      console.error('Error fetching rates:', error.message);
      throw new Error('Failed to fetch currency rates');
    }
  }

  async convertCurrency(amount, fromCurrency, toCurrency) {
    try {
      const rates = await this.getRates();
      
      // Normalize currencies to uppercase
      fromCurrency = fromCurrency.toUpperCase();
      toCurrency = toCurrency.toUpperCase();

      // Validate currencies
      if (!rates[fromCurrency] || !rates[toCurrency]) {
        throw new Error('Invalid currency code');
      }

      // Convert through USD (base currency)
      const amountInUSD = amount / rates[fromCurrency];
      const convertedAmount = amountInUSD * rates[toCurrency];

      return Number(convertedAmount.toFixed(2));
    } catch (error) {
      console.error('Conversion error:', error.message);
      throw error;
    }
  }
}

module.exports = new CurrencyService();