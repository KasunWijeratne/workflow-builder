import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Role, User } from '../types/user.type';
import authService from '../services/auth.service';
import { useNavigate } from 'react-router-dom';

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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const login = async (
    email: string,
    password: string,
    successRedirect: string
  ) => {
    setLoading(true);
    const res = await authService().signIn({ email, password });
    setUser(() => ({
      id: res.user.uid,
      email: res.user.email || '',
      roles: res.roles,
    }));
    navigate(successRedirect);
    setLoading(false);
  };

  const signUp = async (
    email: string,
    password: string,
    roles: Role[],
    successRedirect: string
  ) => {
    setLoading(true);
    await authService().signUp({ email, password, roles });
    navigate(successRedirect);
    setLoading(false);
  };

  const logout = async () => {
    try {
      //TODO: handle logout here
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

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
