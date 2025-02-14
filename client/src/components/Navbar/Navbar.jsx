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
  Tooltip,
  IconButton,
  ListItemIcon,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { NavbarClock } from '../Clock';
import ElevationScroll from './components/ElevationScroll';
import NavbarMenu from './components/NavbarMenu';
import NavbarDesktop from './components/NavbarDesktop';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const Navbar = ({ toggleTheme }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [appsMenuAnchor, setAppsMenuAnchor] = useState(null);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);
  const { user, logout } = useAuth();

  const handleAppsMenu = (event) => {
    setAppsMenuAnchor(event.currentTarget);
  };

  const handleProfileMenu = (event) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const closeAppsMenu = () => {
    setAppsMenuAnchor(null);
  };

  const closeProfileMenu = () => {
    setProfileMenuAnchor(null);
  };

  const navItems = [
    { path: '/counter', label: 'Counter', icon: '🔢' },
    { path: '/clock', label: 'Clock', icon: '⏰' },
    { path: '/money', label: 'Currency', icon: '💱' },
    { path: '/coin-flipper', label: 'Coin Flipper', icon: '🪙' },
    { path: '/pomodoro', label: 'Pomodoro', icon: '⏱️' },
    { path: '/quotes', label: 'Quotes', icon: '💭' },
  ];

  const menuStyles = {
    paper: {
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
        '& .MuiAvatar-root': {
          width: 32,
          height: 32,
          ml: -0.5,
          mr: 1,
        },
      },
    },
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
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            minHeight: { xs: 56, sm: 64 },
          }}
        >
          {/* Left side - Logo and Apps Menu */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography
              variant='h6'
              component={RouterLink}
              to='/'
              sx={{
                color: 'text.primary',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: { xs: '1.1rem', sm: '1.25rem' },
              }}
            >
              Mini Apps
            </Typography>

            {!isMobile && (
              <Button
                endIcon={<KeyboardArrowDownIcon />}
                onClick={handleAppsMenu}
                sx={{
                  color: 'text.primary',
                  '&:hover': { backgroundColor: 'action.hover' },
                }}
              >
                Apps
              </Button>
            )}

            <Menu
              anchorEl={appsMenuAnchor}
              open={Boolean(appsMenuAnchor)}
              onClose={closeAppsMenu}
              PaperProps={menuStyles.paper}
              transformOrigin={{ horizontal: 'left', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            >
              {navItems.map((item) => (
                <MenuItem
                  key={item.path}
                  component={RouterLink}
                  to={item.path}
                  onClick={closeAppsMenu}
                  sx={{
                    py: 1,
                    px: 2,
                    '&:hover': { backgroundColor: 'action.hover' },
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

          {/* Right side - Clock, Profile, and Theme */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 1, sm: 2 },
            }}
          >
            {!isMobile && <NavbarClock />}

            {user ? (
              <>
                <Tooltip title='Account'>
                  <IconButton
                    onClick={handleProfileMenu}
                    sx={{
                      p: 0.5,
                      '&:hover': { backgroundColor: 'action.hover' },
                    }}
                  >
                    <AccountCircleIcon />
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={profileMenuAnchor}
                  open={Boolean(profileMenuAnchor)}
                  onClose={closeProfileMenu}
                  PaperProps={menuStyles.paper}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem
                    component={RouterLink}
                    to='/profile'
                    onClick={closeProfileMenu}
                  >
                    <ListItemIcon>
                      <AccountCircleIcon fontSize='small' />
                    </ListItemIcon>
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      logout();
                      closeProfileMenu();
                    }}
                  >
                    <ListItemIcon>
                      <LogoutIcon fontSize='small' />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                component={RouterLink}
                to='/login'
                color='inherit'
                startIcon={<AccountCircleIcon />}
                sx={{ display: { xs: 'none', sm: 'flex' } }}
              >
                Login
              </Button>
            )}

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
