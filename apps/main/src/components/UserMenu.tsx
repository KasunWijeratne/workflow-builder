import {
  Box,
  IconButton,
  LogoutIcon,
  Menu,
  MenuItem,
  Typography,
} from '@shared/ui';
import { useState } from 'react';
import { useAuth } from '@shared/auth';
import { useNavigate } from 'react-router-dom';

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <>
      <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
        <Box
          sx={{
            width: 30,
            height: 30,
            borderRadius: '50%',
            background: '#ddd',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
          }}
        >
          {user?.email?.slice(0, 1)?.toUpperCase()}
        </Box>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'basic-button',
          },
        }}
      >
        <Box
          sx={{
            p: 2,
            mb: 1,
            borderBottom: 'solid 1px',
            borderColor: 'border.main',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {user?.email}
          </Typography>
        </Box>
        <MenuItem onClick={handleLogout}>
          <LogoutIcon sx={{ mr: 1 }} />
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
