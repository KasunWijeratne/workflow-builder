import { FC, PropsWithChildren } from 'react';
import { Box } from '../components/Box';
import { Stack } from '../components/Stack';
import { Link } from 'react-router-dom';

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
        sx={{ height: 40 }}
      >
        <h2 style={{ margin: 0 }}>
          <Link to={'/dashboard'}>Diagram Builder</Link>
        </h2>
        {userMenu && userMenu}
      </Stack>
      <Box flex={1}>{children}</Box>
    </Stack>
  );
};

export default TopbarLayout;
