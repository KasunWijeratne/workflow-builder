import MUIChip from '@mui/material/Chip';
import MUIDialog from '@mui/material/Dialog';
import MUIIconButton from '@mui/material/IconButton';
import MUIAutocomplete from '@mui/material/Autocomplete';
import MUIMenu from '@mui/material/Menu';
import MUITypography from '@mui/material/Typography';

import EditOutlined from '@mui/icons-material/EditOutlined';
import DoneOutlined from '@mui/icons-material/DoneOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';

//Theme
export * from './theme/ThemeProvider';

//Components
//TODO: move other components to here as well
export * from './components/Button';
export * from './components/Card';
export * from './components/Input';
export * from './components/Select';
export * from './components/MenuItem';
export * from './components/Box';
export * from './components/Stack';
export * from './components/Table';
export const Chip = MUIChip;
export const Dialog = MUIDialog;
export const IconButton = MUIIconButton;
export const Autocomplete = MUIAutocomplete;
export const Menu = MUIMenu;
export const Typography = MUITypography;

//Layouts
export * from './layouts/topbar.layout';
export * from './layouts/topbar-with-controls.layout';

//Icons
// export * from '@mui/icons-material';
export const EditIcon = EditOutlined;
export const DoneIcon = DoneOutlined;
export const MoreIcon = MoreVertIcon;
