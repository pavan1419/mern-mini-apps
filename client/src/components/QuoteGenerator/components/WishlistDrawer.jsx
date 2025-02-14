import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { motion, AnimatePresence } from 'framer-motion';

export const WishlistDrawer = ({ open, onClose, wishlist, onRemove }) => {
  return (
    <Drawer
      anchor='right'
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 400 },
          p: 2,
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant='h6'>Favorite Quotes</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <List>
        <AnimatePresence>
          {wishlist.map((quote) => (
            <motion.div
              key={quote._id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <ListItem
                sx={{
                  border: 1,
                  borderColor: 'divider',
                  borderRadius: 1,
                  mb: 1,
                }}
              >
                <ListItemText
                  primary={quote.content}
                  secondary={`— ${quote.author}`}
                  primaryTypographyProps={{
                    variant: 'body2',
                    fontStyle: 'italic',
                  }}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge='end'
                    onClick={() => onRemove(quote)}
                    color='error'
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </motion.div>
          ))}
        </AnimatePresence>
      </List>

      {wishlist.length === 0 && (
        <Typography
          variant='body2'
          color='text.secondary'
          sx={{ textAlign: 'center', mt: 4 }}
        >
          No favorite quotes yet. Like some quotes to see them here!
        </Typography>
      )}
    </Drawer>
  );
};
