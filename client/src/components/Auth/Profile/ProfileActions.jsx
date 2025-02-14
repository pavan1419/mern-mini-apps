import React from 'react';
import { Box, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';

const ProfileActions = ({ isEditing, setIsEditing, loading, onDelete }) => (
  <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'space-between' }}>
    <Button
      variant='outlined'
      color='error'
      startIcon={<DeleteIcon />}
      onClick={onDelete}
    >
      Delete Account
    </Button>

    <Box sx={{ display: 'flex', gap: 2 }}>
      {isEditing ? (
        <>
          <Button
            variant='outlined'
            startIcon={<CancelIcon />}
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </Button>
          <Button
            type='submit'
            variant='contained'
            startIcon={<SaveIcon />}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </>
      ) : (
        <Button
          variant='contained'
          startIcon={<EditIcon />}
          onClick={() => setIsEditing(true)}
        >
          Edit Profile
        </Button>
      )}
    </Box>
  </Box>
);

export default ProfileActions;
