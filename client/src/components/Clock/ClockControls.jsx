import { Grid, Button, Divider } from '@mui/material';
import { useClockContext } from './ClockContext';

const ClockControls = () => {
  const {
    format24,
    setFormat24,
    showSeconds,
    setShowSeconds,
    showDate,
    setShowDate,
  } = useClockContext();

  return (
    <>
      <Divider sx={{ my: 3 }} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Button
            variant='contained'
            color='primary'
            fullWidth
            onClick={() => setFormat24(!format24)}
          >
            {format24 ? '12-Hour Format' : '24-Hour Format'}
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant='contained'
            color='secondary'
            fullWidth
            onClick={() => setShowSeconds(!showSeconds)}
          >
            {showSeconds ? 'Hide Seconds' : 'Show Seconds'}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant='outlined'
            color='info'
            fullWidth
            onClick={() => setShowDate(!showDate)}
          >
            {showDate ? 'Hide Date' : 'Show Date'}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ClockControls;
