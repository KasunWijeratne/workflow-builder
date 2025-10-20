import MUIChip from '@mui/material/Chip';
import MUIDialog from '@mui/material/Dialog';
import MUIIconButton from '@mui/material/IconButton';
import MUIAutocomplete from '@mui/material/Autocomplete';
import MUIMenu from '@mui/material/Menu';
import MUITypography from '@mui/material/Typography';

import EditOutlined from '@mui/icons-material/EditOutlined';
import DoneOutlined from '@mui/icons-material/DoneOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import Share from '@mui/icons-material/Share';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

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
export const SaveIcon = SaveOutlinedIcon;
export const ShareIcon = Share;
export const DeleteIcon = DeleteOutlinedIcon;
export const LogoutIcon = LogoutOutlinedIcon;
export const EmailIcon = EmailOutlinedIcon;
export const SendIcon = SendOutlinedIcon;

//Context
export * from './context/notification.context';
