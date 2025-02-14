import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';

const FlipStatistics = ({ stats, flipCount }) => {
  if (!flipCount) return null;

  const headsPercentage = (stats.heads / flipCount) * 100;
  const tailsPercentage = (stats.tails / flipCount) * 100;

  return (
    <Box sx={{ mt: 2, mb: 3 }}>
      <Typography variant="h6" color="text.secondary" align="center" gutterBottom>
        Flips: {flipCount}
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Heads: {stats.heads} ({headsPercentage.toFixed(1)}%)
        </Typography>
        <LinearProgress
          variant="determinate"
          value={headsPercentage}
          color="primary"
          sx={{ height: 8, borderRadius: 4 }}
        />
      </Box>
      <Box>
        <Typography variant="body2" color="text.secondary">
          Tails: {stats.tails} ({tailsPercentage.toFixed(1)}%)
        </Typography>
        <LinearProgress
          variant="determinate"
          value={tailsPercentage}
          color="secondary"
          sx={{ height: 8, borderRadius: 4 }}
        />
      </Box>
    </Box>
  );
};

export default FlipStatistics;