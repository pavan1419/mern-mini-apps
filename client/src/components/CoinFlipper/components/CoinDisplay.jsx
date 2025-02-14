import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const CoinDisplay = ({ result, flipping }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1000px',
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={result || 'initial'}
          initial={{ rotateY: 0, opacity: 0 }}
          animate={{
            rotateY: flipping ? [0, 360, 720, 1080] : 0,
            opacity: 1,
            scale: flipping ? [1, 1.2, 1] : 1,
          }}
          exit={{ opacity: 0 }}
          transition={{
            duration: flipping ? 1 : 0.5,
            ease: 'easeInOut',
          }}
        >
          <Typography
            variant="h1"
            color="primary"
            sx={{
              fontWeight: 600,
              fontSize: { xs: '4rem', sm: '6rem' },
              textShadow: `0 2px 4px ${
                theme.palette.mode === 'dark'
                  ? 'rgba(0,0,0,0.5)'
                  : 'rgba(0,0,0,0.2)'
              }`,
              transform: flipping ? 'scale(1.1)' : 'scale(1)',
              transition: 'transform 0.3s ease',
            }}
          >
            {result ? (result === 'Heads' ? '🎯' : '👑') : '🪙'}
          </Typography>
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};

export default CoinDisplay;