import { grey } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export const baseTheme = createTheme({
  typography: {
    fontSize: 14,
    h2: {
      fontSize: '2rem',
    },
    h3: {
      fontSize: '1.5rem',
    },
    h4: {
      fontSize: '1.25rem',
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
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          '.MuiInputBase-root': {
            paddingTop: 0,
            paddingBottom: 0,
          },
        },
        input: {
          paddingLeft: 2,
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
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `none`,
        },
        head: {
          color: grey[700],
        },
      },
    },
  },
});
