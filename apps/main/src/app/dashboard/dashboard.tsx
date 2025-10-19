import { TopbarLayout, Table } from '@shared/ui';
import { Link, useNavigate } from 'react-router-dom';
//TODO: move this to different module (diagramModule) so we dont have to load canvas at this point
import { Diagram, useDiagram } from '@shared/canvas';
import { useEffect, useState } from 'react';

interface DiagramColumn {
  header: string;
  accessorKey: keyof Diagram;
}

const Dashboard = () => {
  const [diagrams, setDiagrams] = useState<Diagram[]>([]);
  const { getDiagrams, loading } = useDiagram();
  const navigate = useNavigate();

  const onRowClick = (row: Diagram) => {
    navigate(`/diagram/${row.id}`);
  };

  useEffect(() => {
    const fetchDiagrams = async () => {
      const data = await getDiagrams();
      setDiagrams(data || []);
    };

    fetchDiagrams();
  }, []);

  return (
    <TopbarLayout>
      <Link to={'/diagram/new'}>Diagram</Link>
      {loading ? <div>Loading...</div> : null}
      <Table columns={columns} rows={diagrams} onRowClick={onRowClick} />
    </TopbarLayout>
  );
};

const columns: DiagramColumn[] = [
  { header: 'Name', accessorKey: 'name' },
  { header: 'Created By', accessorKey: 'createdBy' },
];

export default Dashboard;
