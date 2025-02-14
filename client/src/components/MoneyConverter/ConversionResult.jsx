import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@mui/material/styles';

const ConversionResult = ({ result, amount, fromCurrency, toCurrency }) => {
  const theme = useTheme();
  if (!result) return null;

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 3,
            bgcolor: 'background.default',
            borderRadius: 2,
            textAlign: 'center',
          }}
        >
          <Box>
            <Typography
              variant='h4'
              sx={{
                color: 'primary.main',
                fontWeight: 600,
                fontSize: { xs: '1.5rem', sm: '2rem' },
                mb: 1,
              }}
            >
              {amount} {fromCurrency} = {result.result} {toCurrency}
            </Typography>
            <Typography variant='caption' color='text.secondary'>
              {new Date(result.timestamp).toLocaleString()}
            </Typography>
          </Box>
        </Paper>
      </motion.div>
    </AnimatePresence>
  );
};

export default ConversionResult;
