import { Table, Box, Typography, Button } from '@shared/ui';
import { useNavigate } from 'react-router-dom';
//TODO: move this to different module (diagramModule) so we dont have to load canvas at this point
import { Diagram, useDiagram } from '@shared/canvas';
import { useEffect, useState } from 'react';
import { Role, RoleGate, useAuth } from '@shared/auth';

interface DiagramColumn {
  header: string;
  accessorKey: keyof Diagram;
}

const Dashboard = () => {
  const [diagrams, setDiagrams] = useState<Diagram[]>([]);
  const { getDiagrams, loading } = useDiagram();
  const navigate = useNavigate();
  const { user } = useAuth();

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
    <>
      <Box
        p={4}
        textAlign="center"
        sx={{ background: 'linear-gradient(0deg, white, #e5e9ff)' }}
      >
        <Typography variant="h2" mb={4}>
          Hello,{' '}
          <Typography
            variant="h2"
            component="span"
            color="primary.main"
            fontWeight="600"
          >
            {user?.email} 👋
          </Typography>{' '}
          Welcome!
        </Typography>
        <RoleGate permissions={[Role.EDITOR]}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate('/diagram/new')}
          >
            Create New Diagram
          </Button>
        </RoleGate>
      </Box>

      <Box mt={4} p={4}>
        <Typography variant="h4" mb={2}>
          Your Diagrams
        </Typography>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Table columns={columns} rows={diagrams} onRowClick={onRowClick} />
        )}
      </Box>
    </>
  );
};

const columns: DiagramColumn[] = [
  { header: 'Name', accessorKey: 'name' },
  { header: 'Created By', accessorKey: 'createdBy' },
];

export default Dashboard;
