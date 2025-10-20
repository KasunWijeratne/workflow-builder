import { FC, PropsWithChildren } from 'react';
import { Box } from '../components/Box';
import { Stack } from '../components/Stack';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

interface TopbarLayoutProps extends PropsWithChildren {
  userMenu?: React.ReactNode;
}

export const TopbarLayout: FC<TopbarLayoutProps> = ({ children, userMenu }) => {
  return (
    <Stack direction="column" sx={{ height: '100%' }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          height: 60,
          p: 2,
          borderBottom: '1px solid',
          borderBottomColor: 'border.main',
          backgroundColor: 'primary.main',
        }}
      >
        <Typography
          variant="h2"
          style={{ margin: 0, fontSize: '1rem', fontWeight: 400 }}
        >
          <Link
            to={'/dashboard'}
            style={{ textDecoration: 'none', color: 'white' }}
          >
            Diagram Builder
          </Link>
        </Typography>
        {userMenu && userMenu}
      </Stack>
      <Box flex={1} sx={{ width: '100%', maxWidth: 1500, margin: '0 auto' }}>
        {children}
      </Box>
    </Stack>
  );
};

export default TopbarLayout;
