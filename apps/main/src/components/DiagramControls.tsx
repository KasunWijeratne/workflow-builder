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
import { Role, RoleGate } from '@shared/auth';
import ShareDiagramDialog from '@/components/ShareDiagramDialog';
import { useDiagram } from '@shared/canvas';

interface DiagramControlsProps {
  id?: string;
  name: ReactNode;
  onSave: () => void;
}

interface DiagramMoreControlsProps {
  id: string;
}

const DiagramControls = ({ id, name, onSave }: DiagramControlsProps) => {
  const shareDialogRef = useRef<{ open: () => void; close: () => void }>(null);

  return (
    <Stack direction="row" spacing={2} justifyContent="space-between">
      <h3>{name}</h3>

      <RoleGate permissions={[Role.EDITOR]}>
        <Stack
          direction="row"
          alignItems={'center'}
          spacing={1}
          sx={{ background: 'white', borderRadius: 5, pr: 1, pl: 2 }}
        >
          {id && (
            <>
              <Button
                size="small"
                variant="outlined"
                color="secondary"
                startIcon={<ShareIcon />}
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
            startIcon={<SaveIcon />}
            onClick={onSave}
          >
            Save
          </Button>
          {id && <DiagramMoreControls id={id} />}
        </Stack>
      </RoleGate>
    </Stack>
  );
};

const DiagramMoreControls = ({ id }: DiagramMoreControlsProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { deleteDiagram } = useDiagram();

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
      <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
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
