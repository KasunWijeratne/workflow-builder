import { TopbarLayout, Table } from '@shared/ui';
import { Link } from 'react-router-dom';
import { Diagram, useDiagram } from '@shared/canvas';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const [diagrams, setDiagrams] = useState<Diagram[]>([]);
  const { getDiagrams, loading } = useDiagram();

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
      <Table
        columns={columns}
        rows={diagrams.map(({ name, createdBy }) => ({
          name,
          createdBy,
        }))}
      />
    </TopbarLayout>
  );
};

const columns = [
  { header: 'Name', accessorKey: 'name' },
  { header: 'Created At', accessorKey: 'createdBy' },
];

export default Dashboard;
