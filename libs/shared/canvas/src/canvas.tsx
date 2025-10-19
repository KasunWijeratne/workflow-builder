import {
  ReactFlow,
  Node,
  Edge,
  OnNodesChange,
  OnEdgesChange,
  Connection,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

interface CanvasProps {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: (data: Edge | Connection) => void;
}

export const Canvas = ({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
}: CanvasProps) => {
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
    />
  );
};

export default Canvas;
