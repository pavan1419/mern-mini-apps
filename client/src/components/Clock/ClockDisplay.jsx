import { Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useClockContext } from './ClockContext';

const ClockDisplay = () => {
  const { time, showDate, formatTime, formatDate } = useClockContext();

  return (
    <>
      <Typography variant='h2' align='center' gutterBottom>
        {formatTime()}
      </Typography>

      {showDate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Typography
            variant='h5'
            align='center'
            color='text.secondary'
            gutterBottom
          >
            {formatDate()}
          </Typography>
        </motion.div>
      )}
    </>
  );
};

export default ClockDisplay;
