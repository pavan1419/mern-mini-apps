import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Button,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';

const Counter = () => {
  const theme = useTheme();
  const darkMode = theme.palette.mode === 'dark';
  const [count, setCount] = useState(0);
  const [isAutoIncrementing, setIsAutoIncrementing] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);
  const reset = () => {
    setCount(0);
    setIsAutoIncrementing(false);
  };
  const toggleAutoIncrement = () => setIsAutoIncrementing((prev) => !prev);

  useEffect(() => {
    let interval;
    if (isAutoIncrementing) {
      interval = setInterval(() => setCount((prev) => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isAutoIncrementing]);

  return (
    <Container
      maxWidth='sm'
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' },
        py: { xs: 2, sm: 3 },
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: { xs: '100%', sm: '350px' },
          p: { xs: 2, sm: 3 },
          borderRadius: { xs: 2, sm: 3 },
          backgroundColor: 'background.paper',
          boxShadow: theme.shadows[3],
          textAlign: 'center',
        }}
      >
        <Typography variant='h4' color='text.primary' gutterBottom>
          Counter
        </Typography>

        <motion.div
          key={count}
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <Typography variant='h2' color='primary'>
            {count}
          </Typography>
        </motion.div>

        <Box sx={{ marginTop: '1.5rem' }}>
          <Button
            variant='contained'
            color='primary'
            onClick={increment}
            fullWidth
            sx={{ marginBottom: '0.5rem' }}
          >
            Increment
          </Button>
          <Button
            variant='contained'
            color='secondary'
            onClick={decrement}
            fullWidth
            sx={{ marginBottom: '0.5rem' }}
          >
            Decrement
          </Button>
          <Button
            variant='contained'
            color={isAutoIncrementing ? 'warning' : 'info'}
            onClick={toggleAutoIncrement}
            fullWidth
            sx={{ marginBottom: '0.5rem' }}
          >
            {isAutoIncrementing ? 'Stop Auto' : 'Start Auto'}
          </Button>
          <Button variant='contained' color='error' onClick={reset} fullWidth>
            Reset
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Counter;
