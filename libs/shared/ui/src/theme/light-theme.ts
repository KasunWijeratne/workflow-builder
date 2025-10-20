import { grey } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';
import { baseTheme } from './base-theme';
import { root } from './theme';

const lightPalette = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: root['--primary-color-main'],
      light: root['--primary-color-light'],
      dark: root['--primary-color-dark'],
    },
    secondary: {
      main: root['--secondary-color-main'],
      light: root['--secondary-color-light'],
      dark: root['--secondary-color-dark'],
    },
    border: {
      main: grey[300],
      light: grey[100],
      dark: grey[500],
    },
    text: {
      primary: '#000000',
      secondary: grey[600],
    },
    node: {
      main: grey[100],
    },
    banner: {
      main: '#e5e9ff',
    },
    list: {
      main: '#f5f5f5',
      dark: '#f5f5f5',
    },
  },
});

export const lightTheme = createTheme(deepmerge(lightPalette, baseTheme));
