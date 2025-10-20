import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Role, User } from '../types/user.type';
import authService from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '@shared/ui';
import { AuthError } from 'firebase/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (
    email: string,
    password: string,
    successRedirect: string
  ) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    roles: Role[],
    successRedirect: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  isAllowed: (allowedRoles: Role[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { addNotification } = useNotification();

  const login = async (
    email: string,
    password: string,
    successRedirect: string
  ) => {
    try {
      setLoading(true);
      const res = await authService().signIn({ email, password });
      if (res) {
        setUser(() => ({
          id: res.user.uid,
          email: res.user.email || '',
          roles: res.roles,
        }));
        navigate(successRedirect);
      }
    } catch (error) {
      const code = (error as AuthError).code;
      console.error('Login error:', code);
      addNotification(`Login error: ${code}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (
    email: string,
    password: string,
    roles: Role[],
    successRedirect: string
  ) => {
    try {
      setLoading(true);
      await authService().signUp({ email, password, roles });
      navigate(successRedirect);
      addNotification(`Signup success`, 'success');
    } catch (error) {
      const code = (error as AuthError).code;
      console.error('Signup error:', code);
      addNotification(`Signup error: ${code}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await authService().signOut();
    } catch (error) {
      const code = (error as AuthError).code;
      console.error('Logout error:', code);
      addNotification(`Logout error: ${code}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const isAllowed = useCallback(
    (allowedRoles: Role[]): boolean => {
      if (!user) return false;
      return user.roles.some((role) => allowedRoles.includes(role));
    },
    [user]
  );

  useEffect(() => {
    const unsubscribe = authService().checkUser((currentUser) => {
      const { user, roles } = currentUser || {};
      setUser(() => ({
        id: user?.uid || '',
        email: user?.email || '',
        roles: roles || [],
      }));
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signUp,
        logout,
        isAllowed,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
