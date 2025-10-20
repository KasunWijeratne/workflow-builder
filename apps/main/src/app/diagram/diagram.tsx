import { useCallback, useEffect, useRef, useState } from 'react';
import { DiagramControlsLayout } from '@shared/ui';
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
  Diagram,
} from '@shared/canvas';
import {
  CustomLabelNode,
  nodeType as customLabelNodeType,
} from '@shared/nodes-customlabel';
import { useParams } from 'react-router-dom';
import DiagramControls from '@/components/DiagramControls';
import DiagramName from '@/components/DiagramName';

const nodeTypes = {
  [customLabelNodeType]: CustomLabelNode,
};

const getId = (length: number) => `${++length}`;
const nodeOrigin: [number, number] = [0.5, 0];

const ViewDiagram = () => {
  const reactFlowWrapper = useRef(null);
  const [diagram, setDiagram] = useState<Diagram>();

  //TODO: check if this can be moved into the canvas module
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { screenToFlowPosition } = useReactFlow();
  const { getDiagramById, updateDiagram, loading } = useDiagram();
  const { id } = useParams();

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

  const onUpdate = useCallback(() => {
    updateDiagram({
      id: diagram?.id || '',
      createdBy: diagram?.createdBy || '',
      name: diagram?.name || 'Untitled Diagram',
      nodes: JSON.stringify(nodes),
      edges: JSON.stringify(edges),
    });
  }, [
    updateDiagram,
    diagram?.id,
    diagram?.createdBy,
    diagram?.name,
    nodes,
    edges,
  ]);

  useEffect(() => {
    const fetchDiagram = async (id: string) => {
      const data = await getDiagramById(id);
      const { name, nodes, edges, createdBy } = data || {};
      const nodesData = nodes ? JSON.parse(nodes) : [];
      const edgesData = edges ? JSON.parse(edges) : [];
      setNodes(nodesData);
      setEdges(edgesData);
      setDiagram({ id, name, nodes, edges, createdBy });
    };

    if (id) {
      fetchDiagram(id);
    }
  }, [id]);

  return (
    <DiagramControlsLayout
      controls={
        <DiagramControls
          id={diagram?.id}
          name={
            <DiagramName
              name={diagram?.name || ''}
              onChange={(name) => {
                setDiagram((s) => (s ? { ...s, name } : diagram));
              }}
            />
          }
          loading={loading}
          onSave={onUpdate}
        />
      }
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
    </DiagramControlsLayout>
  );
};

export default ViewDiagram;
