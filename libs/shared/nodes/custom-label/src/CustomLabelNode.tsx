import { useEffect, useRef, useState } from 'react';
import {
  Box,
  IconButton,
  Input,
  DoneIcon,
  EditIcon,
  Typography,
  Stack,
} from '@shared/ui';
import { Role, RoleGate } from '@shared/auth';
import { Position, Handle, NodeProps, useReactFlow } from '@xyflow/react';

export const nodeType = 'customLabel';

export const CustomLabelNode = (props: NodeProps) => {
  const [editable, setEditable] = useState(false);
  const labelInput = useRef<HTMLInputElement>(null);
  const { updateNodeData } = useReactFlow();

  const label = props.data.label as string;

  const onLabelChange = () => {
    const newLabel = labelInput.current?.value;
    if (newLabel && newLabel !== label) {
      updateNodeData(props.id, { label: newLabel });
    }
    setEditable(false);
  };

  useEffect(() => {
    if (editable && labelInput.current) {
      labelInput.current.value = label;
      labelInput.current.focus();
    }
  }, [editable, label]);

  return (
    <Box
      sx={{
        p: 1,
        border: 'solid 1px',
        borderRadius: 3,
        borderColor: 'border.dark',
        backgroundColor: 'grey.100',
      }}
    >
      <Handle type="target" position={Position.Top} />

      {editable ? (
        <Stack direction={'row'} alignItems={'center'}>
          <Input
            placeholder="Label"
            size="small"
            inputRef={labelInput}
            sx={{ mb: 0, mr: 1 }}
            slotProps={{
              input: {
                sx: {
                  '& input': {
                    padding: 1,
                    height: 15,
                  },
                },
              },
            }}
          />
          <IconButton onClick={onLabelChange} size="small">
            <DoneIcon sx={{ fontSize: 15, color: 'secondary.main' }} />
          </IconButton>
        </Stack>
      ) : (
        <Stack direction={'row'} alignItems={'center'}>
          <Typography variant="body1" sx={{ ml: 1 }}>
            {label}
          </Typography>
          <RoleGate permissions={[Role.EDITOR]}>
            <IconButton onClick={() => setEditable(!editable)} size="small">
              <EditIcon sx={{ fontSize: 15 }} />
            </IconButton>
          </RoleGate>
        </Stack>
      )}

      <Handle type="source" position={Position.Bottom} />
    </Box>
  );
};

export default CustomLabelNode;
