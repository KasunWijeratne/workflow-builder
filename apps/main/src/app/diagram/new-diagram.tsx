import { useCallback, useMemo, useRef } from 'react';
import { Button, Stack, TopbarWithFloatingControls } from '@shared/ui';
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

  //TODO: check if this can be moved into the canvas module
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { screenToFlowPosition } = useReactFlow();

  const { createDiagram } = useDiagram();

  const controls = useMemo(() => {
    return (
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <h3>New Diagram</h3>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            createDiagram({
              name: 'New Diagram',
              nodes: JSON.stringify(nodes),
              edges: JSON.stringify(edges),
            });
          }}
        >
          Save
        </Button>
      </Stack>
    );
  }, [createDiagram, edges, nodes]);

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

  return (
    <TopbarWithFloatingControls controls={controls}>
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
          style={{ backgroundColor: '#eee' }}
        />
      </div>
    </TopbarWithFloatingControls>
  );
};

export default NewDiagram;
