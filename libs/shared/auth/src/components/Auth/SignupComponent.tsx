import { FormEvent, useRef, useState } from 'react';
import { Card, Input, Select, MenuItem, Chip, Box } from '@shared/ui';
import { useAuth } from '../../context/auth-context';
import { Role } from '../../types/user.type';
import styles from './auth.module.css';
import { Link } from 'react-router-dom';
import AuthFooter from './Footer';

export const SignupComponent = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [roles, setRoles] = useState<Role[]>([]);

  const { signUp, loading } = useAuth();

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (email && password) {
      await signUp(email, password, roles, '/dashboard');
    }
  };

  return (
    <Box
      component="form"
      className={styles.layout__login}
      onSubmit={handleSignup}
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
          <Select
            fullWidth
            multiple
            required
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
        </Box>
        <AuthFooter
          loading={loading}
          link={
            <>
              Already have an account? <Link to="/login">Login</Link>
            </>
          }
        />
      </Card>
    </Box>
  );
};

export default SignupComponent;
