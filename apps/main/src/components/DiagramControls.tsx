import { useRef } from 'react';
import { Button, Stack } from '@shared/ui';
import { Role, RoleGate } from '@shared/auth';
import ShareDiagramDialog from '@/components/ShareDiagramDialog';

interface DiagramControlsProps {
  name: string;
  onSave: () => void;
}

const DiagramControls = ({ name, onSave }: DiagramControlsProps) => {
  const shareDialogRef = useRef<{ open: () => void; close: () => void }>(null);

  return (
    <Stack direction="row" spacing={2} justifyContent="space-between">
      <h3>{name}</h3>

      <RoleGate permissions={[Role.EDITOR]}>
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              shareDialogRef?.current?.open();
            }}
          >
            Share
          </Button>
          <ShareDiagramDialog ref={shareDialogRef} />
          <Button variant="contained" color="primary" onClick={onSave}>
            Save
          </Button>
        </Stack>
      </RoleGate>
    </Stack>
  );
};

export default DiagramControls;
