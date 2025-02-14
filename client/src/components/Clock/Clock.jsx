import React from 'react';
import { Container, Paper, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import ClockDisplay from './ClockDisplay';
import ClockControls from './ClockControls';

const Clock = () => {
  const theme = useTheme();

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: 'calc(100vh - 64px)',
        py: 4,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 2,
          backgroundColor: theme.palette.background.paper,
          maxWidth: 600,
          width: '100%',
        }}
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <ClockDisplay />
          <ClockControls />
        </motion.div>
      </Paper>
    </Container>
  );
};

export default Clock;
