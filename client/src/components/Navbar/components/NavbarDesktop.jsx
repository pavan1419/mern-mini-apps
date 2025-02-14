import React from 'react';
import { Box, Button, IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const NavbarDesktop = ({ isDarkMode, toggleTheme, navItems }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {navItems.map((item) => (
        <Button
          key={item.path}
          component={RouterLink}
          to={item.path}
          sx={{
            color: 'text.primary',
            px: 2,
            borderRadius: 2,
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          }}
        >
          {item.label}
        </Button>
      ))}
      <IconButton
        onClick={toggleTheme}
        sx={{
          ml: 1,
          color: 'text.primary',
          '&:hover': {
            backgroundColor: 'action.hover',
          },
        }}
      >
        {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  );
};

export default NavbarDesktop;
