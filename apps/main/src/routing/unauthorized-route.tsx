import { Button, Stack, Typography } from '@shared/ui';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <Stack
      direction={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      sx={{ width: '100%', height: '100%' }}
    >
      <Typography variant="h3" mb={3}>
        Unavailable or Unauthorized
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => navigate('/login')}
      >
        Go to Login
      </Button>
    </Stack>
  );
};

export default Unauthorized;
