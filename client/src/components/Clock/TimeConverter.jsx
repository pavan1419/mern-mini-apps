import React, { useState, useEffect } from 'react';
import {
  Typography,
  Grid,
  TextField,
  MenuItem,
  Paper,
  Divider,
  useTheme,
  Button,
  CircularProgress,
  Box,
} from '@mui/material';
import { useClockContext } from './ClockContext';

const TimeConverter = () => {
  const theme = useTheme();
  const { selectedTimezone, setSelectedTimezone, timeZones } =
    useClockContext();
  const [convertedData, setConvertedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleConvert = async () => {
    if (!selectedTimezone) return;

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `http://localhost:5000/api/time/${selectedTimezone}`
      );
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error.message);
      }

      setConvertedData(result.data);
    } catch (error) {
      setError(error.message || 'Failed to convert time');
      setConvertedData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Divider sx={{ my: 3 }} />
      <Typography variant='h6' gutterBottom>
        Time Converter
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            select
            fullWidth
            label='Select Timezone'
            value={selectedTimezone}
            onChange={(e) => setSelectedTimezone(e.target.value)}
            sx={{ mb: 2 }}
          >
            {timeZones.map((zone) => (
              <MenuItem key={zone.id} value={zone.id}>
                {zone.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant='contained'
            color='primary'
            fullWidth
            onClick={handleConvert}
            disabled={loading}
            sx={{ mb: 2 }}
          >
            {loading ? (
              <CircularProgress size={24} color='inherit' />
            ) : (
              'Convert Time'
            )}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Paper
            variant='outlined'
            sx={{
              p: 2,
              textAlign: 'center',
              bgcolor: theme.palette.action.hover,
              minHeight: 60,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
            }}
          >
            {error ? (
              <Typography color='error'>{error}</Typography>
            ) : convertedData ? (
              <>
                <Typography variant='h5'>{convertedData.time}</Typography>
                <Typography variant='body1' color='text.secondary'>
                  {convertedData.date}
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  {convertedData.timezone}
                </Typography>
              </>
            ) : (
              <Typography variant='body1'>
                Select timezone and click convert
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default TimeConverter;
