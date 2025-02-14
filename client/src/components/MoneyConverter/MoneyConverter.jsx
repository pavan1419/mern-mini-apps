import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid,
  CircularProgress,
} from '@mui/material';
import { motion } from 'framer-motion';

const MoneyConverter = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const currencies = [
    { code: 'USD', name: 'US Dollar' },
    { code: 'EUR', name: 'Euro' },
    { code: 'GBP', name: 'British Pound' },
    { code: 'JPY', name: 'Japanese Yen' },
    { code: 'INR', name: 'Indian Rupee' },
  ];

  const handleConvert = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/money/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: fromCurrency,
          to: toCurrency,
          amount: Number(amount),
        }),
      });
      const data = await response.json();
      setResult(data.data);
    } catch (error) {
      console.error('Conversion failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth='md' sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant='h4' gutterBottom align='center'>
            Money Converter
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <TextField
                select
                fullWidth
                label='From'
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
              >
                {currencies.map((currency) => (
                  <MenuItem key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                type='number'
                label='Amount'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                select
                fullWidth
                label='To'
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
              >
                {currencies.map((currency) => (
                  <MenuItem key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <Button
            variant='contained'
            fullWidth
            onClick={handleConvert}
            disabled={loading || !amount}
            sx={{ mt: 3 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Convert'}
          </Button>
          {result && (
            <Paper variant='outlined' sx={{ p: 2, mt: 3, textAlign: 'center' }}>
              <Typography variant='h5'>
                {amount} {fromCurrency} = {result.result} {toCurrency}
              </Typography>
            </Paper>
          )}
        </Paper>
      </motion.div>
    </Container>
  );
};

export default MoneyConverter;
