import { FormEvent, useRef } from 'react';
import { Input } from '@shared/ui';
import { useAuth } from '../../context/auth-context';
import { Link } from 'react-router-dom';
import AuthCompoennt from './AuthCompoennt';

export const LoginComponent = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { login, loading } = useAuth();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (email && password) {
      await login(email, password, '/dashboard');
    }
  };

  return (
    <AuthCompoennt
      buttonText="Login"
      loading={loading}
      link={
        <>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </>
      }
      onSubmit={handleLogin}
    >
      <Input
        fullWidth
        required
        type="email"
        inputRef={emailRef}
        placeholder="Email"
        margin="normal"
      />
      <Input
        fullWidth
        required
        inputRef={passwordRef}
        placeholder="password"
        type="password"
        margin="normal"
      />
    </AuthCompoennt>
  );
};

export default LoginComponent;
