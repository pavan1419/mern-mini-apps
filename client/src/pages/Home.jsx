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
  ];

  return (
    <Container maxWidth='lg' sx={{ py: { xs: 2, sm: 3, md: 4 } }}>
      <Typography
        variant='h3'
        component='h1'
        gutterBottom
        sx={{
          fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
          textAlign: 'center',
          mb: { xs: 2, sm: 3, md: 4 },
        }}
      >
        Welcome to Mini Apps
      </Typography>

      <Grid container spacing={{ xs: 2, sm: 3 }} justifyContent='center'>
        {apps.map((app, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                p: { xs: 2, sm: 3 },
                cursor: 'pointer',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
              onClick={() => navigate(app.path)}
            >
              <CardContent>
                <Typography
                  variant='h2'
                  sx={{
                    fontSize: { xs: '2.5rem', sm: '3rem' },
                    textAlign: 'center',
                    mb: 2,
                  }}
                >
                  {app.icon}
                </Typography>
                <Typography
                  variant='h5'
                  sx={{
                    fontSize: { xs: '1.25rem', sm: '1.5rem' },
                    mb: 1,
                    textAlign: 'center',
                  }}
                >
                  {app.title}
                </Typography>
                <Typography
                  variant='body2'
                  sx={{
                    textAlign: 'center',
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                  }}
                >
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
