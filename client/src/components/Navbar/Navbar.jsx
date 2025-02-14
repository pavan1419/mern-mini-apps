import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { NavbarClock } from '../Clock';
import ElevationScroll from './components/ElevationScroll';
import NavbarMenu from './components/NavbarMenu';
import NavbarDesktop from './components/NavbarDesktop';

const Navbar = ({ toggleTheme }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/counter', label: 'Counter', icon: '🔢' },
    { path: '/clock', label: 'Clock', icon: '⏰' },
    { path: '/money', label: 'Currency', icon: '💱' },
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
            <NavbarMenu
              isDarkMode={isDarkMode}
              toggleTheme={toggleTheme}
              navItems={navItems}
            />
          ) : (
            <NavbarDesktop
              isDarkMode={isDarkMode}
              toggleTheme={toggleTheme}
              navItems={navItems}
            />
          )}
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
};

export default Navbar;
