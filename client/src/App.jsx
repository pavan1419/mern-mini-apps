import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, Container, Paper } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Counter from './components/Counter';
import { Clock, ClockProvider } from './components/Clock';
import { MoneyConverter } from './components/MoneyConverter';
import './App.css';

const App = ({ toggleTheme }) => {
  return (
    <Router>
      <ClockProvider>
        <Paper
          sx={{
            minHeight: '100vh',
            borderRadius: 0,
            backgroundColor: 'background.default',
          }}
        >
          <Navbar toggleTheme={toggleTheme} />
          <Container maxWidth='lg'>
            <Box sx={{ py: 3 }}>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/counter' element={<Counter />} />
                <Route path='/clock' element={<Clock />} />
                <Route path='/money' element={<MoneyConverter />} />
              </Routes>
            </Box>
          </Container>
        </Paper>
      </ClockProvider>
    </Router>
  );
};

export default App;
