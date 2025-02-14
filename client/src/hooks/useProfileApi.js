import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const useProfileApi = () => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRequest = async (url, method, data) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`http://localhost:5000/api/users${url}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error.message);
      }

      if (result.data && updateUser) {
        updateUser(result.data);
      }

      setSuccess(result.message || 'Operation successful');
      return result.data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateProfile: (data) => handleRequest('/profile', 'PUT', data),
    changePassword: (data) => handleRequest('/change-password', 'PUT', data),
    deleteProfile: () => handleRequest('/profile', 'DELETE'),
    loading,
    error,
    success,
  };
};

export default useProfileApi;
