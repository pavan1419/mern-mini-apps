import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Alert, Divider } from '@mui/material';
import { useAuth } from '../../../context/AuthContext';
import ProfileHeader from './ProfileHeader';
import ProfileForm from './ProfileForm';
import ProfileActions from './ProfileActions';
import { useNavigate } from 'react-router-dom';
import useProfileApi from '../../../hooks/useProfileApi';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const {
    updateProfile,
    changePassword,
    deleteProfile,
    loading,
    error,
    success,
  } = useProfileApi();

  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    currentPassword: '',
    newPassword: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        currentPassword: '',
        newPassword: '',
      });
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await updateProfile(formData);
    if (success) {
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      const success = await deleteProfile();
      if (success) {
        logout();
        navigate('/');
      }
    }
  };

  return (
    <Box sx={{ py: 4, px: 2 }}>
      <Card sx={{ maxWidth: 800, margin: 'auto', boxShadow: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <ProfileHeader user={user} />
          <Divider sx={{ my: 3 }} />

          {error && (
            <Alert severity='error' sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity='success' sx={{ mb: 3 }}>
              {success}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <ProfileForm
              formData={formData}
              handleChange={(e) => {
                const { name, value } = e.target;
                setFormData((prev) => ({ ...prev, [name]: value }));
              }}
              isEditing={isEditing}
              showPassword={showPassword}
              togglePassword={() => setShowPassword(!showPassword)}
            />
            <ProfileActions
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              loading={loading}
              onDelete={handleDelete}
            />
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;
