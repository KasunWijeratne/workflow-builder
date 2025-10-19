import { TopbarLayout, Table } from '@shared/ui';
import { Link, useNavigate } from 'react-router-dom';
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
