import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box, Container, Paper } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Counter from './components/Counter';
import { Clock, ClockProvider } from './components/Clock';
import { MoneyConverter } from './components/MoneyConverter';
import { CoinFlipper } from './components/CoinFlipper';
import Footer from './components/Footer/Footer';
import { PomodoroTimer } from './components/PomodoroTimer';
import { QuoteGenerator } from './components/QuoteGenerator';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Profile from './components/Auth/Profile/Profile';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import { useAuth } from './context/AuthContext';

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path='/' element={<Home />} />
      <Route path='/counter' element={<Counter />} />
      <Route path='/clock' element={<Clock />} />
      <Route path='/money' element={<MoneyConverter />} />
      <Route path='/coin-flipper' element={<CoinFlipper />} />
      <Route path='/pomodoro' element={<PomodoroTimer />} />
      <Route path='/quotes' element={<QuoteGenerator />} />

      {/* Auth Routes */}
      <Route
        path='/login'
        element={user ? <Navigate to='/profile' replace /> : <Login />}
      />
      <Route
        path='/register'
        element={user ? <Navigate to='/profile' replace /> : <Register />}
      />

      {/* Protected Routes */}
      <Route
        path='/profile'
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* Catch all route */}
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};

const App = ({ toggleTheme }) => {
  return (
    <Router>
      <AuthProvider>
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
                <AppRoutes />
              </Box>
            </Container>
            <Footer />
          </Paper>
        </ClockProvider>
      </AuthProvider>
    </Router>
  );
};

App.propTypes = {
  toggleTheme: PropTypes.func.isRequired,
};

export default App;
