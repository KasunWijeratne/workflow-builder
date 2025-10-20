import { Box, Button, Typography } from '@shared/ui';

interface AuthFooterProps {
  loading: boolean;
  link: React.ReactNode;
}

const AuthFooter = ({ loading, link }: AuthFooterProps) => {
  return (
    <Box>
      <Button
        fullWidth
        type="submit"
        variant="contained"
        color="primary"
        loading={loading}
      >
        Login
      </Button>
      <Box sx={{ mt: 2, borderTop: 'solid 1px #ddd' }}>
        <Typography variant="body2" align="center" marginTop={2}>
          {link}
        </Typography>
      </Box>
    </Box>
  );
};

export default AuthFooter;
