import React from 'react';
import { Box, Chip, Typography } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PsychologyIcon from '@mui/icons-material/Psychology';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import { motion } from 'framer-motion';

const categories = [
  { id: 'inspiration', label: 'Inspiration', icon: <AutoAwesomeIcon /> },
  { id: 'life', label: 'Life', icon: <EmojiObjectsIcon /> },
  { id: 'love', label: 'Love', icon: <FavoriteIcon /> },
  { id: 'wisdom', label: 'Wisdom', icon: <PsychologyIcon /> },
];

const QuoteCategories = ({ category, onCategoryChange }) => (
  <Box sx={{ mb: 3 }}>
    <Typography
      variant='h6'
      gutterBottom
      align='center'
      sx={{
        fontWeight: 600,
        background: (theme) =>
          theme.palette.mode === 'dark'
            ? 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
            : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
    >
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
        <motion.div
          key={cat.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Chip
            icon={cat.icon}
            label={cat.label}
            onClick={() => onCategoryChange(cat.id)}
            color={category === cat.id ? 'primary' : 'default'}
            variant={category === cat.id ? 'filled' : 'outlined'}
            sx={{
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                boxShadow: 2,
              },
            }}
          />
        </motion.div>
      ))}
    </Box>
  </Box>
);

export default QuoteCategories;
