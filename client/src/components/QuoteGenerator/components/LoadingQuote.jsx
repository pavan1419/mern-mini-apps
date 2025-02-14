import React from 'react';
import { Box, Skeleton } from '@mui/material';

const LoadingQuote = () => (
  <Box sx={{ my: 4, px: 2 }}>
    <Skeleton variant='text' sx={{ fontSize: '2rem' }} />
    <Skeleton variant='text' sx={{ fontSize: '2rem' }} />
    <Skeleton variant='text' sx={{ fontSize: '2rem', width: '60%' }} />
    <Skeleton
      variant='text'
      sx={{ fontSize: '1.2rem', width: '30%', ml: 'auto', mt: 2 }}
    />
  </Box>
);

export default LoadingQuote;
