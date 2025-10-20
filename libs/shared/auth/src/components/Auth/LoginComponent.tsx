import { FormEvent, useRef } from 'react';
import { Box, Button, Card, Input, Typography } from '@shared/ui';
import { useAuth } from '../../context/auth-context';
import styles from './auth.module.css';
import { Link } from 'react-router-dom';
import AuthFooter from './Footer';

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
    <Box
      component="form"
      className={styles.layout__login}
      onSubmit={handleLogin}
    >
      <Card className={styles.container}>
        <Box>
          <Input
            fullWidth
            required
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
        </Box>
        <AuthFooter
          loading={loading}
          link={
            <>
              Don't have an account? <Link to="/signup">Sign up</Link>
            </>
          }
        />
      </Card>
    </Box>
  );
};

export default LoginComponent;
