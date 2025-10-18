import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RootRoute = () => {
  //TODO: get from auth module
  const user = null;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [navigate, user]);

  return null;
};

export default RootRoute;
