import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@shared/auth';

const RootRoute = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  }, [navigate, user, loading]);

  return null;
};

export default RootRoute;
