import { Button, Card, Input } from '@shared/ui';
import styles from './login.module.css';

export const LoginComponent = () => {
  return (
    <div className={styles.layout__login}>
      <Card className={styles.container}>
        <Input fullWidth placeholder="Email" margin="normal" />
        <Input
          fullWidth
          placeholder="password"
          type="password"
          margin="normal"
        />
        <Button fullWidth variant="contained" color="primary">
          Login
        </Button>
      </Card>
    </div>
  );
};

export default LoginComponent;
