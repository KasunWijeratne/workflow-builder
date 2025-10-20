import { DoneIcon, EditIcon, IconButton, Stack, Typography } from '@shared/ui';
import { useRef, useState } from 'react';
import { Role, RoleGate } from '@shared/auth';

interface DiagramNameProps {
  name: string;
  disabled?: boolean;
  onChange: (newName: string) => void;
}

const DiagramName = ({ name, disabled, onChange }: DiagramNameProps) => {
  const nameInput = useRef<HTMLInputElement>(null);
  const [editable, setEditable] = useState(false);

  const onUpdate = () => {
    onChange(nameInput.current?.value || name);
    setEditable(false);
  };

  return (
    <Stack
      direction="row"
      alignItems={'center'}
      sx={{
        backgroundColor: 'background.paper',
        borderRadius: 5,
        px: 2,
        py: '6px',
      }}
      gap={1}
    >
      {editable && (
        <Stack direction={'row'} alignItems={'center'}>
          <input
            autoFocus
            ref={nameInput}
            defaultValue={name}
            disabled={disabled}
            style={{
              border: 'none',
              outline: 'none',
              borderBottom: 'solid 1px',
            }}
          />
          <IconButton
            size="small"
            sx={{ color: 'secondary.main' }}
            onClick={onUpdate}
          >
            <DoneIcon fontSize="small" />
          </IconButton>
        </Stack>
      )}
      {!editable && (
        <>
          <Typography variant="body1">{name}</Typography>
          <RoleGate permissions={[Role.EDITOR]}>
            <IconButton
              disabled={disabled}
              size="small"
              sx={{ mr: -1 }}
              onClick={() => setEditable(true)}
            >
              <EditIcon fontSize="small" sx={{ color: 'secondary.main' }} />
            </IconButton>
          </RoleGate>
        </>
      )}
    </Stack>
  );
};

export default DiagramName;
