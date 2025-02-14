const express = require('express');
const router = express.Router();
const currencyService = require('../services/currencyService');

// Store conversion history in memory (replace with database in production)
let conversionHistory = [];

// Get available currencies with latest rates
router.get('/currencies', async (req, res, next) => {
  try {
    const rates = await currencyService.getRates();
    const currencies = Object.entries(rates).map(([code, rate]) => ({
      code,
      rate,
    }));

    res.json({
      success: true,
      data: currencies,
    });
  } catch (error) {
    next(error);
  }
});

// Convert currency
router.post('/convert', async (req, res, next) => {
  try {
    const { from, to, amount } = req.body;

    if (!amount || !from || !to) {
      return res.status(400).json({
        success: false,
        error: { message: 'Missing required fields', status: 400 },
      });
    }

    const result = await currencyService.convertCurrency(amount, from, to);

    const conversion = {
      id: Date.now(),
      from,
      to,
      amount: Number(amount),
      result,
      timestamp: new Date().toISOString(),
    };

    // Save to history
    conversionHistory.unshift(conversion);
    conversionHistory = conversionHistory.slice(0, 10); // Keep last 10 conversions

    res.json({
      success: true,
      data: conversion,
    });
  } catch (error) {
    if (error.message === 'Invalid currency code') {
      return res.status(400).json({
        success: false,
        error: { message: error.message, status: 400 },
      });
    }
    next(error);
  }
});

// Get conversion history
router.get('/history', (req, res) => {
  res.json({
    success: true,
    data: conversionHistory,
  });
});

module.exports = router;
