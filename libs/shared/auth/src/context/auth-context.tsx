import { createContext, ReactNode, useContext, useState } from 'react';
import { User } from '../types/user.type';
import authService from '../services/auth.service';
import { AuthError } from 'firebase/auth';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const res = await authService().signIn({ email, password });
      setUser({
        id: res.user.uid,
        email: res.user.email || '',
        name: res.user.displayName || '',
        roles: [],
      });
    } catch (error: AuthError | unknown) {
      console.error('Login error:', (error as AuthError).code);
      throw error;
    }
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
