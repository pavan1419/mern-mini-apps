import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { NavbarClock } from '../Clock';
import ElevationScroll from './components/ElevationScroll';
import NavbarMenu from './components/NavbarMenu';
import NavbarDesktop from './components/NavbarDesktop';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from 'react';

const Navbar = ({ toggleTheme }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navItems = [
    { path: '/counter', label: 'Counter', icon: '🔢' },
    { path: '/clock', label: 'Clock', icon: '⏰' },
    { path: '/money', label: 'Currency', icon: '💱' },
    { path: '/coin-flipper', label: 'Coin Flipper', icon: '🪙' },
    { path: '/pomodoro', label: 'Pomodoro', icon: '⏱️' },
  ];

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
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant='h6'
              component={RouterLink}
              to='/'
              sx={{
                color: 'text.primary',
                textDecoration: 'none',
                fontWeight: 600,
                mr: 2,
              }}
            >
              Mini Apps
            </Typography>

            {!isMobile && (
              <Button
                endIcon={<KeyboardArrowDownIcon />}
                onClick={handleClick}
                sx={{
                  color: 'text.primary',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                Apps
              </Button>
            )}

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  mt: 1,
                  bgcolor:
                    theme.palette.mode === 'dark'
                      ? 'rgba(30, 30, 30, 0.9)'
                      : 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(8px)',
                  border: 1,
                  borderColor: 'divider',
                  borderRadius: 2,
                  minWidth: 180,
                },
              }}
            >
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
            </Menu>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <NavbarClock />
            {isMobile ? (
              <NavbarMenu
                isDarkMode={isDarkMode}
                toggleTheme={toggleTheme}
                navItems={navItems}
              />
            ) : (
              <NavbarDesktop
                isDarkMode={isDarkMode}
                toggleTheme={toggleTheme}
              />
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
};

export default Navbar;
