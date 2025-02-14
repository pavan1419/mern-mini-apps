import React from 'react';
import { Box, Typography } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { motion, AnimatePresence } from 'framer-motion';

const QuoteDisplay = ({ quote }) => {
  if (!quote) return null;

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={quote._id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ my: 4, px: 2 }}>
          <Typography
            variant='h5'
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 1,
              fontStyle: 'italic',
              lineHeight: 1.6,
            }}
          >
            <FormatQuoteIcon
              sx={{
                transform: 'rotate(180deg)',
                color: 'primary.main',
                fontSize: 40,
              }}
            />
            {quote.content}
          </Typography>
          <Typography
            variant='subtitle1'
            sx={{
              mt: 2,
              textAlign: 'right',
              color: 'text.secondary',
              fontWeight: 500,
            }}
          >
            — {quote.author}
          </Typography>
        </Box>
      </motion.div>
    </AnimatePresence>
  );
};

export default QuoteDisplay;
