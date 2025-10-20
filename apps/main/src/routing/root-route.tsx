import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RootRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/dashboard');
  }, [navigate]);

  return null;
};

export default RootRoute;
