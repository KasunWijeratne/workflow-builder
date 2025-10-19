import { FC, PropsWithChildren } from 'react';
import { useAuth } from '../context/auth-context';
import { Role } from '../types/user.type';

interface RoleGateProps extends PropsWithChildren {
  permissions: Role[];
}

export const RoleGate: FC<RoleGateProps> = ({ children, permissions }) => {
  const { user, loading } = useAuth();

  if (!user && !loading) {
    return null;
  }

  if (user && permissions && permissions.length > 0) {
    const isAllowed = user.roles.some((role) => permissions.includes(role));

    if (isAllowed) {
      return children;
    }
  }

  return null;
};
