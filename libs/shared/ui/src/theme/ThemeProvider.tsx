import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './ThemeProvider.d.ts';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { lightTheme } from './light-theme';
import { darkTheme } from './dark-theme';

declare module '@mui/material/styles' {
  interface Palette {
    border: Palette['primary'];
    node: Palette['primary'];
    banner: Palette['primary'];
    list: Palette['primary'];
  }
  interface PaletteOptions {
    border?: PaletteOptions['primary'];
    node?: PaletteOptions['primary'];
    banner?: PaletteOptions['primary'];
    list?: PaletteOptions['primary'];
  }
}

export interface ThemeContextType {
  mode: 'light' | 'dark';
  setMode: Dispatch<SetStateAction<'light' | 'dark'>>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const theme = mode === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
}

export { ThemeProvider };

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
};
