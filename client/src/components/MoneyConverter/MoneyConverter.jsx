import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  useTheme,
  Card,
  CardContent,
  Alert,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import CurrencyForm from './CurrencyForm';
import ConversionResult from './ConversionResult';
import ConversionHistory from './ConversionHistory';

const MoneyConverter = () => {
  const theme = useTheme();
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [availableCurrencies, setAvailableCurrencies] = useState([]);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    fetchCurrencies();
    fetchHistory();
  }, []);

  const fetchCurrencies = async () => {
    try {
      const response = await fetch(
        'https://mern-mini-apps.onrender.com/api/money/currencies'
      );
      const data = await response.json();
      if (data.success) {
        setAvailableCurrencies(data.data);
      } else {
        throw new Error(data.error.message);
      }
    } catch (error) {
      setError('Failed to fetch currencies');
    }
  };

  const fetchHistory = async () => {
    try {
      const response = await fetch(
        'https://mern-mini-apps.onrender.com/api/money/history'
      );
      const data = await response.json();
      if (data.success) {
        setHistory(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch history:', error);
    }
  };

  const handleConvert = async () => {
    try {
      setError(null);
      setLoading(true);
      const response = await fetch(
        'https://mern-mini-apps.onrender.com/api/money/convert',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            from: fromCurrency,
            to: toCurrency,
            amount: Number(amount),
          }),
        }
      );
      const data = await response.json();

      if (data.success) {
        setResult(data.data);
        fetchHistory(); // Refresh history after conversion
      } else {
        throw new Error(data.error.message);
      }
    } catch (error) {
      setError(error.message || 'Conversion failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <Container maxWidth='md' sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card
          elevation={theme.palette.mode === 'dark' ? 2 : 1}
          sx={{
            bgcolor: 'background.paper',
            borderRadius: 2,
            overflow: 'hidden',
            border: 1,
            borderColor: 'divider',
          }}
        >
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography
              variant='h4'
              align='center'
              gutterBottom
              sx={{
                color: 'primary.main',
                fontWeight: 600,
                fontSize: { xs: '1.75rem', sm: '2.125rem' },
              }}
            >
              Currency Converter
            </Typography>

            {error && (
              <Alert severity='error' sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <Box sx={{ mb: 4 }}>
              <CurrencyForm
                amount={amount}
                fromCurrency={fromCurrency}
                toCurrency={toCurrency}
                availableCurrencies={availableCurrencies}
                loading={loading}
                onAmountChange={(e) => setAmount(e.target.value)}
                onFromCurrencyChange={(e) => setFromCurrency(e.target.value)}
                onToCurrencyChange={(e) => setToCurrency(e.target.value)}
                onSwapCurrencies={handleSwapCurrencies}
                onConvert={handleConvert}
              />
            </Box>

            <AnimatePresence>
              {result && (
                <ConversionResult
                  result={result}
                  amount={amount}
                  fromCurrency={fromCurrency}
                  toCurrency={toCurrency}
                />
              )}
            </AnimatePresence>

            <ConversionHistory
              history={history}
              showHistory={showHistory}
              onToggleHistory={() => setShowHistory(!showHistory)}
            />
          </CardContent>
        </Card>
      </motion.div>
    </Container>
  );
};

export default MoneyConverter;
