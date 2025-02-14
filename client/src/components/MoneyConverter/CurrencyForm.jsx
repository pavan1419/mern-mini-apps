import React from 'react';
import {
  Grid,
  TextField,
  MenuItem,
  IconButton,
  Tooltip,
  Button,
  CircularProgress,
} from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { useTheme } from '@mui/material/styles';

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
  const theme = useTheme();

  const textFieldStyle = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.divider,
      },
      '&:hover fieldset': {
        borderColor: theme.palette.primary.main,
      },
    },
  };

  return (
    <>
      <Grid container spacing={3} alignItems='center'>
        <Grid item xs={12} sm={4}>
          <TextField
            select
            fullWidth
            label='From'
            value={fromCurrency}
            onChange={onFromCurrencyChange}
            sx={textFieldStyle}
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
            <IconButton onClick={onSwapCurrencies} color='primary'>
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
            onChange={onAmountChange}
            error={amount < 0}
            helperText={amount < 0 ? 'Amount cannot be negative' : ''}
            sx={textFieldStyle}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            select
            fullWidth
            label='To'
            value={toCurrency}
            onChange={onToCurrencyChange}
            sx={textFieldStyle}
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
        onClick={onConvert}
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
    </>
  );
};

export default CurrencyForm;
