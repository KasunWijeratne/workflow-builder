import { grey } from '@mui/material/colors';
import { root } from './theme';
import { createTheme } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';
import { baseTheme } from './base-theme';

const darkPalette = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: root['--primary-color-main-dark'],
      light: root['--primary-color-light'],
      dark: root['--primary-color-dark'],
    },
    secondary: {
      main: root['--secondary-color-main-dark'],
      light: root['--secondary-color-light'],
      dark: root['--secondary-color-dark'],
    },
    border: {
      main: grey[300],
      light: grey[100],
      dark: grey[500],
    },
    text: {
      primary: '#fff',
      secondary: grey[600],
    },
    background: {
      default: '#000',
      paper: '#000',
    },
    node: {
      main: grey[400],
    },
    banner: {
      main: '#9725ff7d',
    },
    list: {
      main: '#f5f5f5',
      dark: '#2b2b2bff',
    },
  },
});

export const darkTheme = createTheme(deepmerge(darkPalette, baseTheme));
