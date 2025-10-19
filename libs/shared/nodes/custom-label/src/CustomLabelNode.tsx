import { useEffect, useRef, useState } from 'react';
import { Box, IconButton, Input, DoneIcon, EditIcon } from '@shared/ui';
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
    if (newLabel !== label) {
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
    <Box sx={{ border: 'solid 1px', borderRadius: 1, py: 1, px: 2 }}>
      <Handle type="target" position={Position.Top} />

      {editable ? (
        <>
          <Input
            id="text"
            placeholder="Label"
            name="text"
            inputRef={labelInput}
          />
          <IconButton onClick={onLabelChange} size="small">
            <DoneIcon />
          </IconButton>
        </>
      ) : (
        <>
          <span>{label}</span>
          <RoleGate permissions={[Role.EDITOR]}>
            <IconButton onClick={() => setEditable(!editable)} size="small">
              <EditIcon />
            </IconButton>
          </RoleGate>
        </>
      )}

      <Handle type="source" position={Position.Bottom} />
    </Box>
  );
};

export default CustomLabelNode;
