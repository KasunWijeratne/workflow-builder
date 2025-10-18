import { useRef, useState } from 'react';
import { Button, Card, Input, Select, MenuItem, Chip } from '@shared/ui';
import { useAuth } from '../../context/auth-context';
import { Role } from '../../types/user.type';
import styles from './auth.module.css';

export const SignupComponent = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [roles, setRoles] = useState<Role[]>([]);

  const { signUp, loading } = useAuth();

  const handleSignup = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (email && password) {
      await signUp(email, password, roles, '/dashboard');
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
        <Select
          fullWidth
          multiple
          value={roles}
          onChange={(event) => {
            const {
              target: { value },
            } = event;
            setRoles(
              typeof value === 'string' ? (value.split(',') as Role[]) : value
            );
          }}
          renderValue={(selected: Role[]) => (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </div>
          )}
        >
          <MenuItem value={Role.VIEWER}>{Role.VIEWER}</MenuItem>
          <MenuItem value={Role.EDITOR}>{Role.EDITOR}</MenuItem>
        </Select>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          loading={loading}
          onClick={handleSignup}
        >
          Sign Up
        </Button>
      </Card>
    </div>
  );
};

export default SignupComponent;
