import React from 'react';
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';

const TimerModes = ({ mode, modes, onModeChange }) => (
  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
    <ToggleButtonGroup
      value={mode}
      exclusive
      onChange={(_, newMode) => newMode && onModeChange(newMode)}
      aria-label='timer mode'
    >
      {Object.entries(modes).map(([key, { label }]) => (
        <ToggleButton key={key} value={key} aria-label={label}>
          {label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  </Box>
);

export default TimerModes;
