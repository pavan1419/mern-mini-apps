import React from 'react';
import { Box, Button } from '@mui/material';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { motion } from 'framer-motion';

const QuoteControls = ({ onFetch, loading }) => (
  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        variant='contained'
        size='large'
        onClick={onFetch}
        disabled={loading}
        startIcon={
          <AutorenewIcon
            sx={{
              animation: loading ? 'spin 1s linear infinite' : 'none',
              '@keyframes spin': {
                '0%': { transform: 'rotate(0deg)' },
                '100%': { transform: 'rotate(360deg)' },
              },
            }}
          />
        }
      >
        {loading ? 'Fetching Quote...' : 'New Quote'}
      </Button>
    </motion.div>
  </Box>
);

export default QuoteControls;
