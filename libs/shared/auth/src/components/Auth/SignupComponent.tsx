import { useRef } from 'react';
import { Button, Card, Input, Select, MenuItem } from '@shared/ui';
import styles from './auth.module.css';
import { useAuth } from '../../context/auth-context';
import { Role } from '../../types/user.type';

export const SignupComponent = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const roleRef = useRef<HTMLInputElement>(null);

  const { signUp } = useAuth();

  const handleSignup = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const role = roleRef.current?.value as Role;

    if (email && password && role) {
      await signUp(email, password, role, '/dashboard');
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
        <Select fullWidth inputRef={roleRef}>
          <MenuItem value={Role.VIEWER}>{Role.VIEWER}</MenuItem>
          <MenuItem value={Role.EDITOR}>{Role.EDITOR}</MenuItem>
        </Select>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSignup}
        >
          Sign Up
        </Button>
      </Card>
    </div>
  );
};

export default SignupComponent;
