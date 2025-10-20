import { Card, Box, Button, Typography } from '@shared/ui';
import styles from './auth.module.css';
import { FormEvent, PropsWithChildren, ReactNode } from 'react';

interface AuthCompoenntProps extends PropsWithChildren {
  onSubmit: (e: FormEvent) => Promise<void>;
  buttonText: string;
  link: ReactNode;
  loading: boolean;
}

const AuthCompoennt = ({
  onSubmit,
  buttonText,
  link,
  loading,
  children,
}: AuthCompoenntProps) => {
  return (
    <Box sx={{ background: 'linear-gradient(90deg, white, #e5e9ff);' }}>
      <Box
        component="form"
        className={styles.layout__login}
        onSubmit={onSubmit}
      >
        <Typography variant="h1" fontSize={'5rem'} pl={5}>
          Visual Diagram Builder
        </Typography>
        <Card className={styles.container}>
          <Box>{children}</Box>
          <Box>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              loading={loading}
            >
              {buttonText}
            </Button>
            <Box sx={{ mt: 2, borderTop: 'solid 1px #ddd' }}>
              <Typography variant="body2" align="center" marginTop={2}>
                {link}
              </Typography>
            </Box>
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default AuthCompoennt;
