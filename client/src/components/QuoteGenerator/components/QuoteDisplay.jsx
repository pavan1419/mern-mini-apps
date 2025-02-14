import React, { useState } from 'react';
import { Box, Typography, IconButton, Tooltip, Snackbar } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { motion, AnimatePresence } from 'framer-motion';

const QuoteDisplay = ({ quote, isLiked, onLikeToggle }) => {
  const [showCopySnackbar, setShowCopySnackbar] = useState(false);

  if (!quote) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `"${quote.content}" — ${quote.author}`
      );
      setShowCopySnackbar(true);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Inspiring Quote',
          text: `"${quote.content}" — ${quote.author}`,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Failed to share:', err);
      }
    }
  };

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={quote._id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ my: 4, px: 2, position: 'relative' }}>
          <Typography
            variant='h5'
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 1,
              fontStyle: 'italic',
              lineHeight: 1.6,
            }}
          >
            <FormatQuoteIcon
              sx={{
                transform: 'rotate(180deg)',
                color: 'primary.main',
                fontSize: 40,
              }}
            />
            {quote.content}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 2,
            }}
          >
            <Typography
              variant='subtitle1'
              sx={{
                color: 'text.secondary',
                fontWeight: 500,
              }}
            >
              — {quote.author}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Tooltip title='Copy quote'>
                  <IconButton size='small' onClick={handleCopy}>
                    <ContentCopyIcon fontSize='small' />
                  </IconButton>
                </Tooltip>
              </motion.div>
              {navigator.share && (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Tooltip title='Share quote'>
                    <IconButton size='small' onClick={handleShare}>
                      <ShareIcon fontSize='small' />
                    </IconButton>
                  </Tooltip>
                </motion.div>
              )}
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Tooltip title={isLiked ? 'Remove from favorites' : 'Add to favorites'}>
                  <IconButton
                    size='small'
                    onClick={onLikeToggle}
                    color={isLiked ? 'error' : 'default'}
                  >
                    <FavoriteIcon fontSize='small' />
                  </IconButton>
                </Tooltip>
              </motion.div>
            </Box>
          </Box>
        </Box>
        <Snackbar
          open={showCopySnackbar}
          autoHideDuration={2000}
          onClose={() => setShowCopySnackbar(false)}
          message='Quote copied to clipboard!'
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default QuoteDisplay;
