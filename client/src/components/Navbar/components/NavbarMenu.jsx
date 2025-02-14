import React from 'react';
import { IconButton, Menu, MenuItem, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const NavbarMenu = ({ isDarkMode, toggleTheme, navItems }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        edge='end'
        color='inherit'
        onClick={handleMenu}
        sx={{
          ml: 1,
          color: 'text.primary',
          '&:hover': {
            backgroundColor: 'action.hover',
          },
        }}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            bgcolor:
              theme.palette.mode === 'dark'
                ? 'rgba(30, 30, 30, 0.9)'
                : 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(8px)',
            border: 1,
            borderColor: 'divider',
          },
        }}
      >
        {navItems.map((item) => (
          <MenuItem
            key={item.path}
            component={RouterLink}
            to={item.path}
            onClick={handleClose}
            sx={{ minWidth: 120 }}
          >
            {item.label}
          </MenuItem>
        ))}
        <MenuItem
          onClick={() => {
            toggleTheme();
            handleClose();
          }}
        >
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </MenuItem>
      </Menu>
    </>
  );
};

export default NavbarMenu;
