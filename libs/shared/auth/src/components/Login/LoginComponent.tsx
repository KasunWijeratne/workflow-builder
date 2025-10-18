import { useRef } from 'react';
import { Button, Card, Input } from '@shared/ui';
import styles from './login.module.css';
import { useAuth } from '../../context/auth-context';

export const LoginComponent = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { login } = useAuth();

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
          onClick={handleLogin}
        >
          Login
        </Button>
      </Card>
    </div>
  );
};

export default LoginComponent;
