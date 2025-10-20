import {
  ReactFlow,
  Node,
  Edge,
  OnNodesChange,
  OnEdgesChange,
  Connection,
  ReactFlowProps,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useMemo } from 'react';
import { Role, useAuth } from '@shared/auth';

interface CanvasProps extends ReactFlowProps {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: (data: Edge | Connection) => void;
}

export const Canvas = (props: CanvasProps) => {
  const { isAllowed } = useAuth();

  const validProps = useMemo(
    () => ({
      ...props,
      elementsSelectable: isAllowed([Role.EDITOR]),
      nodesDraggable: isAllowed([Role.EDITOR]),
    }),
    [isAllowed, props]
  );

  return (
    <ReactFlow style={{ backgroundColor: '#eee' }} {...validProps} fitView />
  );
};

export default Canvas;
