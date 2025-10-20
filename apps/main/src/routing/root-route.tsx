import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@shared/auth';

const RootRoute = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user?.id) {
      navigate('/dashboard');
    }
  }, [navigate, user, loading]);

  return <Outlet />;
};

export default RootRoute;
