import React from 'react';
import {
  Grid,
  Typography,
  IconButton,
  Tooltip,
  Paper,
  Divider,
} from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@mui/material/styles';

const ConversionHistory = ({ history, showHistory, onToggleHistory }) => {
  const theme = useTheme();

  return (
    <>
      <Divider sx={{ my: 4 }} />
      <Grid container alignItems='center' spacing={2}>
        <Grid item>
          <Typography variant='h6'>Conversion History</Typography>
        </Grid>
        <Grid item>
          <Tooltip title={showHistory ? 'Hide history' : 'Show history'}>
            <IconButton onClick={onToggleHistory}>
              <HistoryIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>

      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {history.map((item) => (
              <Paper
                key={item.id}
                variant='outlined'
                sx={{
                  p: 2,
                  mt: 2,
                  bgcolor: theme.palette.action.hover,
                  borderColor: theme.palette.divider,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: theme.palette.action.selected,
                  },
                }}
              >
                <Typography>
                  {item.amount} {item.from} = {item.result} {item.to}
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  {new Date(item.timestamp).toLocaleString()}
                </Typography>
              </Paper>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ConversionHistory;
