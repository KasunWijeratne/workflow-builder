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

interface CanvasProps extends ReactFlowProps {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: (data: Edge | Connection) => void;
}

export const Canvas = (props: CanvasProps) => {
  return <ReactFlow {...props} fitView />;
};

export default Canvas;
