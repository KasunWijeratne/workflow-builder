import { FC, PropsWithChildren } from 'react';
import { Box } from '../components/Box';

interface DiagramControlsLayoutProps extends PropsWithChildren {
  controls: React.ReactNode | null;
}

export const DiagramControlsLayout: FC<DiagramControlsLayoutProps> = ({
  children,
  controls,
}) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
    >
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
      {children}
    </Box>
  );
};

export default DiagramControlsLayout;
