import { Box, Button, Typography } from '@shared/ui';

interface AuthFooterProps {
  loading: boolean;
  buttonText: string;
  link: React.ReactNode;
}

const AuthFooter = ({ loading, link, buttonText }: AuthFooterProps) => {
  return (
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
  );
};

export default AuthFooter;
