import React from 'react';
import { Box, Avatar, Typography } from '@mui/material';

const ProfileHeader = ({ user }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
    <Avatar
      sx={{
        width: 80,
        height: 80,
        bgcolor: 'primary.main',
        fontSize: '2rem',
      }}
    >
      {user?.username?.charAt(0).toUpperCase()}
    </Avatar>
    <Box sx={{ ml: 3 }}>
      <Typography variant='h4'>{user?.username}</Typography>
      <Typography variant='body1' color='textSecondary'>
        {user?.email}
      </Typography>
    </Box>
  </Box>
);

export default ProfileHeader;
