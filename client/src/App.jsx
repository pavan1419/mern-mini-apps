import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box, Container, Paper } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Counter from './components/Counter';
import { Clock, ClockProvider } from './components/Clock';
import { MoneyConverter } from './components/MoneyConverter';
import { CoinFlipper } from './components/CoinFlipper';
import Footer from './components/Footer/Footer';
// import './App.css';

const App = ({ toggleTheme }) => {
  return (
    <Router>
      <ClockProvider>
        <Paper
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'background.default',
            borderRadius: 0,
          }}
        >
          <Navbar toggleTheme={toggleTheme} />
          <Container
            maxWidth='lg'
            sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}
          >
            <Box sx={{ flex: 1, py: 3 }}>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/counter' element={<Counter />} />
                <Route path='/clock' element={<Clock />} />
                <Route path='/money' element={<MoneyConverter />} />
                <Route path='/coin-flipper' element={<CoinFlipper />} />
              </Routes>
            </Box>
          </Container>
          <Footer />
        </Paper>
      </ClockProvider>
    </Router>
  );
};
App.propTypes = {
  toggleTheme: PropTypes.func.isRequired,
};

export default App;
