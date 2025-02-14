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
  Alert,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import HistoryIcon from '@mui/icons-material/History';
import { useTheme } from '@mui/material/styles';

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
        'http://localhost:5000/api/money/currencies'
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
      const response = await fetch('http://localhost:5000/api/money/history');
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
        <Paper
          elevation={3}
          sx={{
            p: 4,
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
        >
          <Typography variant='h4' gutterBottom align='center'>
            Currency Converter
          </Typography>

          {error && (
            <Alert severity='error' sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Grid container spacing={3} alignItems='center'>
            <Grid item xs={12} sm={4}>
              <TextField
                select
                fullWidth
                label='From'
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: theme.palette.divider,
                    },
                    '&:hover fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              >
                {availableCurrencies.map((currency) => (
                  <MenuItem key={currency.code} value={currency.code}>
                    {currency.code} ({currency.rate})
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={1}>
              <Tooltip title='Swap currencies'>
                <IconButton onClick={handleSwapCurrencies} color='primary'>
                  <SwapHorizIcon />
                </IconButton>
              </Tooltip>
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                type='number'
                label='Amount'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                error={amount < 0}
                helperText={amount < 0 ? 'Amount cannot be negative' : ''}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: theme.palette.divider,
                    },
                    '&:hover fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                select
                fullWidth
                label='To'
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: theme.palette.divider,
                    },
                    '&:hover fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              >
                {availableCurrencies.map((currency) => (
                  <MenuItem key={currency.code} value={currency.code}>
                    {currency.code} ({currency.rate})
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          <Button
            variant='contained'
            fullWidth
            onClick={handleConvert}
            disabled={loading || !amount || amount < 0}
            sx={{
              mt: 3,
              bgcolor: theme.palette.primary.main,
              '&:hover': {
                bgcolor: theme.palette.primary.dark,
              },
            }}
          >
            {loading ? <CircularProgress size={24} /> : 'Convert'}
          </Button>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <Paper
                  variant='outlined'
                  sx={{
                    p: 2,
                    mt: 3,
                    textAlign: 'center',
                    bgcolor: theme.palette.action.hover,
                    borderColor: theme.palette.divider,
                  }}
                >
                  <Typography variant='h5'>
                    {amount} {fromCurrency} = {result.result} {toCurrency}
                  </Typography>
                  <Typography variant='caption' color='text.secondary'>
                    {new Date(result.timestamp).toLocaleString()}
                  </Typography>
                </Paper>
              </motion.div>
            )}
          </AnimatePresence>

          <Divider sx={{ my: 4 }} />

          <Grid container alignItems='center' spacing={2}>
            <Grid item>
              <Typography variant='h6'>Conversion History</Typography>
            </Grid>
            <Grid item>
              <Tooltip title={showHistory ? 'Hide history' : 'Show history'}>
                <IconButton onClick={() => setShowHistory(!showHistory)}>
                  <HistoryIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>

          <AnimatePresence>
            {showHistory && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {history.map((item) => (
                  <Paper
                    key={item.id}
                    variant='outlined'
                    sx={{
                      p: 2,
                      mt: 2,
                      bgcolor: theme.palette.action.hover,
                      borderColor: theme.palette.divider,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        bgcolor: theme.palette.action.selected,
                      },
                    }}
                  >
                    <Typography>
                      {item.amount} {item.from} = {item.result} {item.to}
                    </Typography>
                    <Typography variant='caption' color='text.secondary'>
                      {new Date(item.timestamp).toLocaleString()}
                    </Typography>
                  </Paper>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default MoneyConverter;
