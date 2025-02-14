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
    <Box sx={{ width: '100%' }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        alignItems='center'
        justifyContent='center'
      >
        <Grid item xs={12} sm={5} md={4}>
          <TextField
            select
            fullWidth
            label='From'
            value={fromCurrency}
            onChange={onFromCurrencyChange}
            variant='outlined'
          >
            {availableCurrencies.map((currency) => (
              <MenuItem key={currency.code} value={currency.code}>
                {currency.code} ({currency.rate})
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid
          item
          xs={12}
          sm='auto'
          sx={{
            display: 'flex',
            justifyContent: { xs: 'center', sm: 'flex-start' },
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
              sx={{ mx: { xs: 0, sm: 1 } }}
            >
              <SwapHorizIcon />
            </IconButton>
          </Tooltip>
        </Grid>

        <Grid item xs={12} sm={5} md={4} sx={{ order: { xs: 2, sm: 3 } }}>
          <TextField
            select
            fullWidth
            label='To'
            value={toCurrency}
            onChange={onToCurrencyChange}
            variant='outlined'
          >
            {availableCurrencies.map((currency) => (
              <MenuItem key={currency.code} value={currency.code}>
                {currency.code} ({currency.rate})
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6} md={4} sx={{ order: 4 }}>
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
              inputProps: { min: 0 },
            }}
          />
        </Grid>

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
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant='contained'
              onClick={onConvert}
              disabled={loading || !amount || amount < 0}
              sx={{
                px: { xs: 4, sm: 6 },
                py: { xs: 1, sm: 1.5 },
                borderRadius: 2,
                fontSize: { xs: '1rem', sm: '1.1rem' },
                minWidth: { xs: '200px', sm: '250px' },
                boxShadow: 2,
                '&:hover': {
                  boxShadow: 4,
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} color='inherit' />
              ) : (
                'Convert'
              )}
            </Button>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CurrencyForm;
