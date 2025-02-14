import React from 'react';
import { Box, Container, Typography, Link, useTheme } from '@mui/material';

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component='footer'
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor:
          theme.palette.mode === 'dark'
            ? theme.palette.grey[800]
            : theme.palette.grey[200],
      }}
    >
      <Container maxWidth='md'>
        <Typography variant='body1' align='center'>
          © {new Date().getFullYear()} Mini Apps. All rights reserved.
        </Typography>
        <Typography variant='body2' color='text.secondary' align='center'>
          {'Built with '}
          <Link color='inherit' href='https://reactjs.org/'>
            React
          </Link>
          {' and '}
          <Link color='inherit' href='https://mui.com/'>
            Material-UI
          </Link>
          {'.'}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
