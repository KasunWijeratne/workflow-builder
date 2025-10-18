import { FC, PropsWithChildren } from 'react';
import { Box } from '../components/Box';
import { Stack } from '../components/Stack';

export const TopbarLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Stack direction="column" sx={{ height: '100%' }}>
      <Box sx={{ height: 40 }}>
        <h2 style={{ margin: 0 }}>Diagram Builder</h2>
      </Box>
      <Box flex={1}>{children}</Box>
    </Stack>
  );
};

export default TopbarLayout;
