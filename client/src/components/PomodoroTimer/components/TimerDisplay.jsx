import React from 'react';
import { Box, Typography } from '@mui/material';

const TimerDisplay = ({ timeLeft, mode, modes }) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <Box sx={{ textAlign: 'center', my: 4 }}>
      <Typography
        variant='h1'
        sx={{
          fontWeight: 700,
          color: modes[mode].color,
          fontSize: { xs: '4rem', sm: '6rem' },
          fontFamily: 'monospace',
        }}
      >
        {`${minutes.toString().padStart(2, '0')}:${seconds
          .toString()
          .padStart(2, '0')}`}
      </Typography>
    </Box>
  );
};

export default TimerDisplay;
