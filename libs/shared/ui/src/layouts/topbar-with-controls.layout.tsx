import { FC, PropsWithChildren } from 'react';
import TopbarLayout from './topbar.layout';
import { Box } from '../components/Box';

interface TopbarWithFloatingControlsProps extends PropsWithChildren {
  controls: React.ReactNode | null;
  userMenu?: React.ReactNode;
}

export const TopbarWithFloatingControls: FC<
  TopbarWithFloatingControlsProps
> = ({ children, controls, userMenu }) => {
  return (
    <TopbarLayout userMenu={userMenu}>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        {controls && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 1,
              p: 2,
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            {controls}
          </Box>
        )}
        {children}
      </Box>
    </TopbarLayout>
  );
};

export default TopbarWithFloatingControls;
