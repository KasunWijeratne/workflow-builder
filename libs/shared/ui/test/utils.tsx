import { ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from '../src/theme/light-theme';
import { render } from '@testing-library/react';

export const renderWithTheme = (comp: ReactNode) =>
  render(<ThemeProvider theme={lightTheme}>{comp}</ThemeProvider>);
