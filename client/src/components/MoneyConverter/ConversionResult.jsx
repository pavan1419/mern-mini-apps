import React from 'react';
import { Paper, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';

const ConversionResult = ({ result, amount, fromCurrency, toCurrency }) => {
  const theme = useTheme();

  return (
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
  );
};

export default ConversionResult;
