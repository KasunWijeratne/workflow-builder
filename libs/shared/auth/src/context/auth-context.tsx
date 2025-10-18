import { createContext, ReactNode, useContext, useState } from 'react';
import { Role, User } from '../types/user.type';
import authService from '../services/auth.service';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
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
  const navigate = useNavigate();

  const login = async (
    email: string,
    password: string,
    successRedirect: string
  ) => {
    const res = await authService().signIn({ email, password });
    setUser({
      id: res.user.uid,
      email: res.user.email || '',
      name: res.user.displayName || '',
      roles: [],
    });
    navigate(successRedirect);
  };

  const signUp = async (
    email: string,
    password: string,
    roles: Role[],
    successRedirect: string
  ) => {
    await authService().signUp({ email, password, roles });
    navigate(successRedirect);
  };

  const logout = async () => {
    try {
      //TODO: handle logout here
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
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
