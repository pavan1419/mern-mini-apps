import React from 'react';
import { Box, Button } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const TimerControls = ({ isRunning, onToggle, onReset }) => (
  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 3 }}>
    <Button
      variant='contained'
      size='large'
      onClick={onToggle}
      startIcon={isRunning ? <PauseIcon /> : <PlayArrowIcon />}
    >
      {isRunning ? 'Pause' : 'Start'}
    </Button>
    <Button
      variant='outlined'
      size='large'
      onClick={onReset}
      startIcon={<RestartAltIcon />}
    >
      Reset
    </Button>
  </Box>
);

export default TimerControls;
