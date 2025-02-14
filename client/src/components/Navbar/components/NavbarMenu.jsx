import React from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  Box,
  Divider,
  ListItemIcon,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../../../context/AuthContext';

const NavbarMenu = ({ isDarkMode, toggleTheme, navItems }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { user, logout } = useAuth();

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
        onClick={handleMenu}
        sx={{
          color: 'text.primary',
          p: 0.5,
          '&:hover': { backgroundColor: 'action.hover' },
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
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))',
            mt: 1.5,
            bgcolor:
              theme.palette.mode === 'dark'
                ? 'rgba(30, 30, 30, 0.9)'
                : 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(8px)',
            border: 1,
            borderColor: 'divider',
            borderRadius: 2,
            minWidth: 200,
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {user && (
          <>
            <MenuItem
              component={RouterLink}
              to='/profile'
              onClick={handleClose}
              sx={{
                py: 1,
                px: 2,
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AccountCircleIcon fontSize='small' />
                Profile
              </Box>
            </MenuItem>
            <Divider />
          </>
        )}
        {navItems.map((item) => (
          <MenuItem
            key={item.path}
            component={RouterLink}
            to={item.path}
            onClick={handleClose}
            sx={{
              py: 1,
              px: 2,
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <span>{item.icon}</span>
              {item.label}
            </Box>
          </MenuItem>
        ))}
        <Divider />
        {user ? (
          <MenuItem
            onClick={() => {
              logout();
              handleClose();
            }}
            sx={{
              py: 1,
              px: 2,
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LogoutIcon fontSize='small' />
              Logout
            </Box>
          </MenuItem>
        ) : (
          <MenuItem
            component={RouterLink}
            to='/login'
            onClick={handleClose}
            sx={{
              py: 1,
              px: 2,
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AccountCircleIcon fontSize='small' />
              Login
            </Box>
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            toggleTheme();
            handleClose();
          }}
          sx={{
            py: 1,
            px: 2,
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {isDarkMode ? (
              <>
                <Brightness7Icon fontSize='small' />
                Light Mode
              </>
            ) : (
              <>
                <Brightness4Icon fontSize='small' />
                Dark Mode
              </>
            )}
          </Box>
        </MenuItem>
      </Menu>
    </>
  );
};

export default NavbarMenu;
