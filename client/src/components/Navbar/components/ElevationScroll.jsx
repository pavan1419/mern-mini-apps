import React from 'react';
import { useScrollTrigger } from '@mui/material';

const ElevationScroll = ({ children }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    sx: {
      backgroundColor: trigger ? 'background.paper' : 'transparent',
      backdropFilter: trigger ? 'blur(8px)' : 'blur(4px)',
      transition: '0.3s ease-in-out',
    },
  });
};

export default ElevationScroll;
