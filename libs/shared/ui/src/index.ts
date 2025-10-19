import MUIChip from '@mui/material/Chip';
import MUIIconButton from '@mui/material/IconButton';
import EditOutlined from '@mui/icons-material/EditOutlined';
import DoneOutlined from '@mui/icons-material/DoneOutlined';

//TODO: move other components to here as well
export * from './components/Button';
export * from './components/Card';
export * from './components/Input';
export * from './components/Select';
export * from './components/MenuItem';
export * from './components/Box';
export * from './components/Stack';

export const Chip = MUIChip;
export const IconButton = MUIIconButton;

//Layouts
export * from './layouts/topbar.layout';
export * from './layouts/topbar-with-controls.layout';

//Icons
// export * from '@mui/icons-material';
export const EditIcon = EditOutlined;
export const DoneIcon = DoneOutlined;
