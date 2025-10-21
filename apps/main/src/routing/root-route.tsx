import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@shared/auth';

const RootRoute = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user?.id) {
      navigate('/dashboard');
    }
    if (location.pathname !== '/login' && location.pathname !== '/signup') {
      navigate('/login');
    }
  }, [user, loading, location.pathname]);

  return <Outlet />;
};

export default RootRoute;
