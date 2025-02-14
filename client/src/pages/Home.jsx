import { useTheme } from '@mui/material/styles';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  useMediaQuery,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const apps = [
    {
      title: 'Counter App',
      description: 'A simple counter application with auto-increment feature',
      path: '/counter',
      icon: '🔢',
    },
    {
      title: 'Clock App',
      description:
        'Digital clock with multiple display options and timezone converter',
      path: '/clock',
      icon: '⏰',
    },
    {
      title: 'Money Converter',
      description:
        'Convert currencies with real-time rates and history tracking',
      path: '/money',
      icon: '💱',
    },
    {
      title: 'Coin Flipper',
      description: 'Flip a coin and get heads or tails',
      path: '/coin-flipper',
      icon: '🪙',
    },
  ];

  return (
    <Container maxWidth='md' sx={{ py: 4 }}>
      <Typography variant='h3' align='center' gutterBottom>
        Welcome to Mini Apps
      </Typography>
      <Typography variant='body1' align='center' gutterBottom>
        Explore our collection of mini applications.
      </Typography>
      <Grid container spacing={4} justifyContent='center'>
        {apps.map((app) => (
          <Grid item xs={12} sm={6} md={4} key={app.title}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: theme.shadows[6],
                },
              }}
              onClick={() => navigate(app.path)}
            >
              <CardContent>
                <Typography variant='h5' component='div' gutterBottom>
                  {app.icon} {app.title}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {app.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
