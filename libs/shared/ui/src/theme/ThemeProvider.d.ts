import {
  Palette as MUIPalette,
  PaletteOptions as MUIPaletteOptions,
} from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    border: MUIPalette['primary'];
  }
  interface PaletteOptions {
    border?: MUIPaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    border: true;
  }
}
