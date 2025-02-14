import React from 'react';
import { Button } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';

const FlipControls = ({ flipping, onFlip }) => (
  <Button
    variant="contained"
    color="primary"
    onClick={onFlip}
    disabled={flipping}
    fullWidth
    startIcon={<CasinoIcon />}
    sx={{
      py: 1.5,
      borderRadius: 2,
      fontSize: { xs: '1rem', sm: '1.1rem' },
      fontWeight: 600,
      textTransform: 'none',
      boxShadow: 2,
      '&:hover': {
        boxShadow: 4,
      },
    }}
  >
    {flipping ? 'Flipping...' : 'Flip Coin'}
  </Button>
);

export default FlipControls;