import { ReactNode, useRef, useState } from 'react';
import {
  Button,
  DeleteIcon,
  IconButton,
  Menu,
  MenuItem,
  MoreIcon,
  SaveIcon,
  ShareIcon,
  Stack,
} from '@shared/ui';
import { Role, RoleGate, useAuth } from '@shared/auth';
import ShareDiagramDialog from '@/components/ShareDiagramDialog';
import { useDiagram } from '@shared/canvas';

interface DiagramControlsProps {
  id?: string;
  name: ReactNode;
  loading?: boolean;
  onSave: () => void;
}

interface DiagramMoreControlsProps {
  id: string;
  disabled?: boolean;
}

const DiagramControls = ({
  id,
  name,
  loading,
  onSave,
}: DiagramControlsProps) => {
  const shareDialogRef = useRef<{ open: () => void; close: () => void }>(null);

  return (
    <Stack direction="row" spacing={2} justifyContent="space-between">
      <div>{name}</div>

      <RoleGate permissions={[Role.EDITOR]}>
        <Stack
          direction="row"
          alignItems={'center'}
          spacing={1}
          sx={{ backgroundColor: 'background.paper', borderRadius: 5, px: 2 }}
        >
          {id && (
            <>
              <Button
                size="small"
                variant="outlined"
                color="secondary"
                startIcon={<ShareIcon />}
                disabled={loading}
                onClick={() => {
                  shareDialogRef?.current?.open();
                }}
              >
                Share
              </Button>
              <ShareDiagramDialog id={id} ref={shareDialogRef} />
            </>
          )}
          <Button
            size="small"
            variant="contained"
            color="primary"
            loading={loading}
            startIcon={<SaveIcon />}
            onClick={onSave}
          >
            Save
          </Button>
          {id && <DiagramMoreControls id={id} disabled={loading} />}
        </Stack>
      </RoleGate>
    </Stack>
  );
};

const DiagramMoreControls = ({ id, disabled }: DiagramMoreControlsProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user } = useAuth();
  const { deleteDiagram } = useDiagram(user);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteDiagram = async () => {
    //TODO: get a confirmation before doing this
    await deleteDiagram(id);
  };

  return (
    <>
      <IconButton
        disabled={disabled}
        onClick={handleClick}
        size="small"
        sx={{ ml: 2, mr: -2 }}
      >
        <MoreIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleDeleteDiagram}>
          <DeleteIcon fontSize="small" sx={{ mr: 1, color: 'warning.main' }} />
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};

export default DiagramControls;
