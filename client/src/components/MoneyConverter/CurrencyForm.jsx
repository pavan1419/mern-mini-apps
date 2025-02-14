import React from 'react';
import {
  Grid,
  TextField,
  MenuItem,
  IconButton,
  Tooltip,
  Button,
  CircularProgress,
  Box,
  Paper,
} from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { motion } from 'framer-motion';

const CurrencyForm = ({
  amount,
  fromCurrency,
  toCurrency,
  availableCurrencies,
  loading,
  onAmountChange,
  onFromCurrencyChange,
  onToCurrencyChange,
  onSwapCurrencies,
  onConvert,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 3 },
        bgcolor: 'background.default',
        borderRadius: 2,
      }}
    >
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        alignItems='center'
        justifyContent='center'
      >
        {/* From Currency */}
        <Grid item xs={12} sm={5} md={4}>
          <TextField
            select
            fullWidth
            label='From Currency'
            value={fromCurrency}
            onChange={onFromCurrencyChange}
            variant='outlined'
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
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

        {/* Swap Button */}
        <Grid
          item
          xs={12}
          sm='auto'
          sx={{
            display: 'flex',
            justifyContent: 'center',
            order: { xs: 3, sm: 2 },
          }}
        >
          <Tooltip title='Swap currencies'>
            <IconButton
              onClick={onSwapCurrencies}
              color='primary'
              component={motion.button}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              sx={{
                mx: { xs: 0, sm: 1 },
                bgcolor: 'background.paper',
                boxShadow: 1,
                '&:hover': {
                  bgcolor: 'background.paper',
                  boxShadow: 2,
                },
              }}
            >
              <SwapHorizIcon />
            </IconButton>
          </Tooltip>
        </Grid>

        {/* To Currency */}
        <Grid item xs={12} sm={5} md={4} sx={{ order: { xs: 2, sm: 3 } }}>
          <TextField
            select
            fullWidth
            label='To Currency'
            value={toCurrency}
            onChange={onToCurrencyChange}
            variant='outlined'
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
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

        {/* Amount Input */}
        <Grid item xs={12} md={6} sx={{ order: 4 }}>
          <TextField
            fullWidth
            type='number'
            label='Amount'
            value={amount}
            onChange={onAmountChange}
            error={amount < 0}
            helperText={amount < 0 ? "Amount can't be negative" : ''}
            variant='outlined'
            InputProps={{
              inputProps: {
                min: 0,
                step: '0.01',
              },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />
        </Grid>

        {/* Convert Button */}
        <Grid
          item
          xs={12}
          sx={{
            order: 5,
            display: 'flex',
            justifyContent: 'center',
            mt: { xs: 2, sm: 3 },
          }}
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ width: '100%', maxWidth: '300px' }}
          >
            <Button
              variant='contained'
              onClick={onConvert}
              disabled={loading || !amount || amount < 0}
              fullWidth
              sx={{
                py: 1.5,
                borderRadius: 2,
                fontSize: { xs: '1rem', sm: '1.1rem' },
                fontWeight: 600,
                textTransform: 'none',
                boxShadow: 2,
                '&:hover': {
                  boxShadow: 4,
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} color='inherit' />
              ) : (
                'Convert Currency'
              )}
            </Button>
          </motion.div>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CurrencyForm;



