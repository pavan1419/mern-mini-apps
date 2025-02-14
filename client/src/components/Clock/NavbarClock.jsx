import { Typography, Box } from '@mui/material';
import { useClockContext } from './ClockContext';

const NavbarClock = () => {
  const { formatTime } = useClockContext();

  return (
    <Box
      sx={{
        display: { xs: 'none', md: 'flex' },
        alignItems: 'center',
        mx: 2,
      }}
    >
      <Typography
        variant='body1'
        sx={{
          fontFamily: 'monospace',
          fontWeight: 600,
          color: 'text.primary',
          letterSpacing: 1,
        }}
      >
        {formatTime()}
      </Typography>
    </Box>
  );
};

export default NavbarClock;
