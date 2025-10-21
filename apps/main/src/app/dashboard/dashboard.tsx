import { Table, Box, Typography, Button } from '@shared/ui';
import { useNavigate } from 'react-router-dom';
//TODO: move this to different module (diagramModule) so we dont have to load canvas at this point
import { Diagram, useDiagram } from '@shared/canvas';
import { ReactNode, useEffect, useState } from 'react';
import { Role, RoleGate, useAuth } from '@shared/auth';

interface DiagramColumn {
  header: string;
  accessorKey: keyof Diagram;
  component?: (value: string) => ReactNode;
}

const Dashboard = () => {
  const [diagrams, setDiagrams] = useState<Diagram[]>([]);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getDiagrams, loading } = useDiagram(user);

  const onRowClick = (row: Diagram) => {
    navigate(`/diagram/${row.id}`);
  };

  useEffect(() => {
    const fetchDiagrams = async () => {
      const data = await getDiagrams();
      setDiagrams(data || []);
    };

    if (user?.id) {
      fetchDiagrams();
    }
  }, [user?.id]);

  return (
    <>
      <Box
        p={4}
        textAlign="center"
        sx={(theme) => ({
          background: `linear-gradient(0deg, transparent, ${theme.palette.banner.main})`,
          backgroundColor: 'background.paper',
        })}
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

      <Box
        mt={4}
        p={4}
        sx={{ width: '100%', maxWidth: 1200, margin: '0 auto' }}
      >
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
  {
    header: 'Ownership',
    accessorKey: 'shared',
    component: (value: string) => {
      return (
        <Box
          sx={{
            bgcolor: value === 'Shared' ? 'secondary.light' : 'primary.light',
            px: 1,
            py: '4px',
            width: 'fit-content',
            borderRadius: 5,
          }}
        >
          <Typography variant="caption" color="primary.contrastText">
            {value}
          </Typography>
        </Box>
      );
    },
  },
];

export default Dashboard;
