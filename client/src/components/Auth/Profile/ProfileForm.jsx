import React from 'react';
import { Grid, TextField, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const ProfileForm = ({
  formData,
  handleChange,
  isEditing,
  showPassword,
  togglePassword,
}) => (
  <Grid container spacing={3}>
    <Grid item xs={12}>
      <TextField
        fullWidth
        label='Username'
        name='username'
        value={formData.username}
        onChange={handleChange}
        disabled={!isEditing}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        label='First Name'
        name='firstName'
        value={formData.firstName}
        onChange={handleChange}
        disabled={!isEditing}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        label='Last Name'
        name='lastName'
        value={formData.lastName}
        onChange={handleChange}
        disabled={!isEditing}
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        fullWidth
        label='Email'
        name='email'
        type='email'
        value={formData.email}
        onChange={handleChange}
        disabled={!isEditing}
      />
    </Grid>
    {isEditing && (
      <>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label='Current Password'
            name='currentPassword'
            type={showPassword ? 'text' : 'password'}
            value={formData.currentPassword}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={togglePassword} edge='end'>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label='New Password (optional)'
            name='newPassword'
            type={showPassword ? 'text' : 'password'}
            value={formData.newPassword}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={togglePassword} edge='end'>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </>
    )}
  </Grid>
);

export default ProfileForm;
