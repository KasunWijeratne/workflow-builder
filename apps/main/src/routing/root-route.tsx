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
    if (
      !user?.id &&
      location.pathname !== '/login' &&
      location.pathname !== '/signup'
    ) {
      navigate('/login');
    }
  }, [user, location.pathname, loading, navigate]);

  return <Outlet />;
};

export default RootRoute;
