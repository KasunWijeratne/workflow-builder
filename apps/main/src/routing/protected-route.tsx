import { ReactNode } from 'react';
import { Role, useAuth } from '@shared/auth';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
  permissions?: Role[];
  fallbackPath?: string;
}

export const ProtectedRoute = ({
  children,
  permissions,
  fallbackPath = '/login',
}: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if ((!user || (user && !user.id)) && !loading) {
    return <Navigate to={fallbackPath} state={{ from: location }} replace />;
  }

  if (user && user.id && permissions && permissions.length > 0) {
    const isAllowed = user.roles.some((role) => permissions.includes(role));

    if (!isAllowed) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return children;
};
