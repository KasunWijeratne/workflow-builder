import { DoneIcon, EditIcon, IconButton, Stack, Typography } from '@shared/ui';
import { useRef, useState } from 'react';

interface DiagramNameProps {
  name: string;
  onChange: (newName: string) => void;
}

const DiagramName = ({ name, onChange }: DiagramNameProps) => {
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
      sx={{ background: 'white', borderRadius: 5, pr: 1, pl: 2, py: '6px' }}
      gap={1}
    >
      {editable && (
        <Stack direction={'row'} alignItems={'center'}>
          <input
            autoFocus
            ref={nameInput}
            defaultValue={name}
            style={{
              border: 'none',
              outline: 'none',
              borderBottom: 'solid 1px',
            }}
          />
          <IconButton size="small" onClick={onUpdate}>
            <DoneIcon fontSize="small" />
          </IconButton>
        </Stack>
      )}
      {!editable && (
        <>
          <Typography variant="body1">{name}</Typography>
          <IconButton size="small" onClick={() => setEditable(true)}>
            <EditIcon fontSize="small" />
          </IconButton>
        </>
      )}
    </Stack>
  );
};

export default DiagramName;
