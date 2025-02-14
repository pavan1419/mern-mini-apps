import React from 'react';
import { Box, LinearProgress } from '@mui/material';

const TimerProgress = ({ timeLeft, totalTime, color }) => (
  <Box sx={{ width: '100%', mb: 2 }}>
    <LinearProgress
      variant='determinate'
      value={(timeLeft / totalTime) * 100}
      sx={{
        height: 10,
        borderRadius: 5,
        '& .MuiLinearProgress-bar': {
          bgcolor: color,
        },
      }}
    />
  </Box>
);

export default TimerProgress;
