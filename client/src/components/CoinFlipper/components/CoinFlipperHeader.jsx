import React from 'react';
import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const CoinFlipperHeader = ({ flipCount, onReset }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      mb: 3,
    }}
  >
    <Typography variant='h4' color='text.primary'>
      Coin Flipper
    </Typography>
    {flipCount > 0 && (
      <Tooltip title='Reset Game'>
        <IconButton onClick={onReset} color='primary'>
          <RestartAltIcon />
        </IconButton>
      </Tooltip>
    )}
  </Box>
);

export default CoinFlipperHeader;
