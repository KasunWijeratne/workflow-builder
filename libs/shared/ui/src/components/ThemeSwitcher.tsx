import { DarkMode, Sunny } from '@mui/icons-material';
import { Box, Switch } from '@mui/material';
import { ThemeContextType } from '../theme/ThemeProvider';

const wrapperSX = {
  borderRadius: '50%',
  background: 'white',
  width: 20,
  height: 20,
  p: '1px',
};
const iconSX = { color: 'secondary.main', fontSize: 18 };

const ThemeSwitcher = ({ mode, setMode }: ThemeContextType) => {
  return (
    <Switch
      checked={mode === 'dark'}
      onChange={() => setMode(mode === 'light' ? 'dark' : 'light')}
      color="default"
      icon={
        <Box sx={wrapperSX}>
          <Sunny sx={iconSX} />
        </Box>
      }
      checkedIcon={
        <Box sx={wrapperSX}>
          <DarkMode sx={iconSX} />
        </Box>
      }
    />
  );
};

export default ThemeSwitcher;
