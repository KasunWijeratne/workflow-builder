import { useCallback, useRef, useState } from 'react';
import { TopbarWithFloatingControls } from '@shared/ui';
import {
  Canvas,
  addEdge,
  useNodesState,
  useEdgesState,
  useReactFlow,
  Edge,
  Node,
  Connection,
  FinalConnectionState,
  useDiagram,
} from '@shared/canvas';
import {
  CustomLabelNode,
  nodeType as customLabelNodeType,
} from '@shared/nodes-customlabel';
import DiagramControls from '@/components/DiagramControls';
import DiagramName from '@/components/DiagramName';
import UserMenu from '@/components/UserMenu';

const initialNodes = [
  {
    id: 'n1',
    type: customLabelNodeType,
    position: { x: 0, y: 0 },
    data: { label: 'Node 1' },
  },
];

const nodeTypes = {
  [customLabelNodeType]: CustomLabelNode,
};

const getId = (length: number) => `${++length}`;
const nodeOrigin: [number, number] = [0.5, 0];

const NewDiagram = () => {
  const reactFlowWrapper = useRef(null);
  const [diagramName, setDiagramName] = useState<string>('New Diagram');

  //TODO: check if this can be moved into the canvas module
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { screenToFlowPosition } = useReactFlow();

  const { createDiagram } = useDiagram();

  //TODO: check if this can be moved into the canvas module
  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  //TODO: check if this can be moved into the canvas module
  const onConnectEnd = useCallback(
    (event: MouseEvent | TouchEvent, connectionState: FinalConnectionState) => {
      // when a connection is dropped on the pane it's not valid
      if (!connectionState.isValid) {
        // we need to remove the wrapper bounds, in order to get the correct position
        const id = getId(nodes.length);
        const { clientX, clientY } =
          'changedTouches' in event ? event.changedTouches[0] : event;
        const newNode: Node = {
          id,
          type: customLabelNodeType,
          position: screenToFlowPosition({
            x: clientX,
            y: clientY,
          }),
          data: { label: `Node ${id}` },
          origin: [0.5, 0.0],
        };

        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) =>
          connectionState.fromNode
            ? eds.concat({
                id,
                source: connectionState.fromNode.id,
                target: id,
              })
            : eds
        );
      }
    },
    [nodes.length, screenToFlowPosition, setEdges, setNodes]
  );

  const onSave = useCallback(() => {
    createDiagram({
      name: diagramName,
      nodes: JSON.stringify(nodes),
      edges: JSON.stringify(edges),
    });
  }, [createDiagram, diagramName, nodes, edges]);

  return (
    <TopbarWithFloatingControls
      controls={
        <DiagramControls
          name={<DiagramName name={diagramName} onChange={setDiagramName} />}
          onSave={onSave}
        />
      }
      userMenu={<UserMenu />}
    >
      <div style={{ width: '100%', height: '100%' }} ref={reactFlowWrapper}>
        <Canvas
          fitView
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onConnectEnd={onConnectEnd}
          fitViewOptions={{ padding: 2 }}
          nodeOrigin={nodeOrigin}
          nodeTypes={nodeTypes}
        />
      </div>
    </TopbarWithFloatingControls>
  );
};

export default NewDiagram;
