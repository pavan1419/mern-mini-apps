import React from 'react';
import { Box, Chip, Typography } from '@mui/material';

const categories = [
  { id: 'inspiration', label: 'Inspiration' },
  { id: 'life', label: 'Life' },
  { id: 'love', label: 'Love' },
  { id: 'wisdom', label: 'Wisdom' },
];

const QuoteCategories = ({ category, onCategoryChange }) => (
  <Box sx={{ mb: 3 }}>
    <Typography variant='h6' gutterBottom align='center'>
      Quote Categories
    </Typography>
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 1,
        justifyContent: 'center',
      }}
    >
      {categories.map((cat) => (
        <Chip
          key={cat.id}
          label={cat.label}
          onClick={() => onCategoryChange(cat.id)}
          color={category === cat.id ? 'primary' : 'default'}
          variant={category === cat.id ? 'filled' : 'outlined'}
        />
      ))}
    </Box>
  </Box>
);

export default QuoteCategories;
