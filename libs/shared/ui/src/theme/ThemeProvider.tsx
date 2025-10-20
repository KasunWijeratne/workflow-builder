import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { root } from './theme';
import './ThemeProvider.d.ts';
import { grey } from '@mui/material/colors';

declare module '@mui/material/styles' {
  interface Palette {
    border: Palette['primary'];
  }
  interface PaletteOptions {
    border?: PaletteOptions['primary'];
  }
}

const lightTheme = createTheme({
  cssVariables: true,
  typography: {
    fontSize: 14,
  },
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
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          padding: '8px',
          '&:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 1000px #ffeeffff inset',
            WebkitTextFillColor: '#000000',
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          marginTop: 0,
          marginBottom: '8px',
        },
      },
    },
  },
});

const darkTheme = createTheme({
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
  },
});

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const themePreference = 'light';
  const theme = themePreference === 'light' ? lightTheme : darkTheme;

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

export { ThemeProvider };
