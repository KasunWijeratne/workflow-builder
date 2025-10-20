import { useState } from 'react';
import userService from '../services/user.service';
import { FirebaseError } from 'firebase/app';
import { useNotification } from '@shared/ui';

export const useUsers = () => {
  const [loading, setLoading] = useState(false);
  const { addNotification } = useNotification();

  const getUsers = async () => {
    try {
      setLoading(true);
      const users = await userService().getUsers();
      return users;
    } catch (error) {
      const code = (error as FirebaseError).code;
      console.error('Fetching users error:', code);
      addNotification(`Fetching users error: ${code}`, 'error');
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    getUsers,
  };
};

export default useUsers;
