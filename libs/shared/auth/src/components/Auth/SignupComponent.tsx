import { FormEvent, useRef, useState } from 'react';
import { Input, Select, MenuItem, Chip } from '@shared/ui';
import { useAuth } from '../../context/auth-context';
import { Role } from '../../types/user.type';
import { Link } from 'react-router-dom';
import AuthCompoennt from './AuthCompoennt';

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
      await signUp(email, password, roles, '/login');
    }
  };

  return (
    <AuthCompoennt
      onSubmit={handleSignup}
      loading={loading}
      buttonText="Sign up"
      link={
        <>
          Already have an account? <Link to="/login">Login</Link>
        </>
      }
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
    </AuthCompoennt>
  );
};

export default SignupComponent;
