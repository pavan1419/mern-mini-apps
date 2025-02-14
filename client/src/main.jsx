import { StrictMode, useState, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createAppTheme } from './theme';
import App from './App';
// import './index.css';

const Main = () => {
  const [mode, setMode] = useState('dark');

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));
  };

  return (
    <StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App toggleTheme={toggleTheme} />
      </ThemeProvider>
    </StrictMode>
  );
};

createRoot(document.getElementById('root')).render(<Main />);
