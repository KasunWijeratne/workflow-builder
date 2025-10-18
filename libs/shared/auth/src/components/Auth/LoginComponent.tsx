import { useRef } from 'react';
import { Button, Card, Input } from '@shared/ui';
import { useAuth } from '../../context/auth-context';
import styles from './auth.module.css';

export const LoginComponent = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { login, loading } = useAuth();

  const handleLogin = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (email && password) {
      await login(email, password, '/dashboard');
    }
  };

  return (
    <div className={styles.layout__login}>
      <Card className={styles.container}>
        <Input
          fullWidth
          inputRef={emailRef}
          placeholder="Email"
          margin="normal"
        />
        <Input
          fullWidth
          inputRef={passwordRef}
          placeholder="password"
          type="password"
          margin="normal"
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          loading={loading}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Card>
    </div>
  );
};

export default LoginComponent;
