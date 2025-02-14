import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  useTheme,
  Button,
  useMediaQuery,
  useScrollTrigger,
  Menu,
  MenuItem,
} from '@mui/material';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import { NavbarClock } from './Clock';

function ElevationScroll(props) {
  const { children } = props;
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
}

const Navbar = ({ toggleTheme }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ElevationScroll>
      <AppBar
        position='sticky'
        sx={{
          background:
            theme.palette.mode === 'dark'
              ? 'rgba(30, 30, 30, 0.8)'
              : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(8px)',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Toolbar>
          <Typography
            variant='h6'
            component={RouterLink}
            to='/'
            sx={{
              color: 'text.primary',
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            Mini Apps
          </Typography>

          <NavbarClock />

          <Box sx={{ flexGrow: 1 }} />

          {isMobile ? (
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
                <MenuItem
                  component={RouterLink}
                  to='/'
                  onClick={handleClose}
                  sx={{ minWidth: 120 }}
                >
                  Home
                </MenuItem>
                <MenuItem
                  component={RouterLink}
                  to='/counter'
                  onClick={handleClose}
                >
                  Counter
                </MenuItem>
                <MenuItem
                  component={RouterLink}
                  to='/clock'
                  onClick={handleClose}
                >
                  Clock
                </MenuItem>
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
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button
                component={RouterLink}
                to='/'
                sx={{
                  color: 'text.primary',
                  px: 2,
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                Home
              </Button>
              <Button
                component={RouterLink}
                to='/counter'
                sx={{
                  color: 'text.primary',
                  px: 2,
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                Counter
              </Button>
              <Button
                component={RouterLink}
                to='/clock'
                sx={{
                  color: 'text.primary',
                  px: 2,
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                Clock
              </Button>
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
          )}
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
};

export default Navbar;
