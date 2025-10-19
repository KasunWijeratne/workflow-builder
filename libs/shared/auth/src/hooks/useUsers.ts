import { useState } from 'react';
import userService from '../services/user.service';

export const useUsers = () => {
  const [loading, setLoading] = useState(false);

  const getUsers = async () => {
    setLoading(true);
    const users = userService().getUsers();
    setLoading(false);
    return users;
  };

  return {
    loading,
    getUsers,
  };
};

export default useUsers;
