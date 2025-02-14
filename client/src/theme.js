import { createTheme } from '@mui/material/styles';

export const createAppTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      ...(mode === 'dark'
        ? {
            // Dark theme
            primary: {
              main: '#00D4FF',
            },
            secondary: {
              main: '#FF9800',
            },
            background: {
              default: '#121212',
              paper: '#1E1E1E',
            },
            text: {
              primary: '#E0E0E0',
              secondary: '#B0B0B0',
            },
            divider: 'rgba(255, 255, 255, 0.1)',
          }
        : {
            // Light theme
            primary: {
              main: '#007AFF',
            },
            secondary: {
              main: '#FF5722',
            },
            background: {
              default: '#F5F5F5',
              paper: '#FFFFFF',
            },
            text: {
              primary: '#333333',
              secondary: '#666666',
            },
            divider: 'rgba(0, 0, 0, 0.1)',
          }),
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
            fontWeight: 500,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            padding: {
              xs: '1rem',
              sm: '1.5rem',
              md: '2rem',
            },
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          h1: {
            fontSize: {
              xs: '2rem',
              sm: '2.5rem',
              md: '3rem',
            },
          },
          h2: {
            fontSize: {
              xs: '1.75rem',
              sm: '2rem',
              md: '2.5rem',
            },
          },
        },
      },
    },
  });
