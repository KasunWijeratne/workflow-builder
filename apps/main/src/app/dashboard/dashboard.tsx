import { TopbarLayout } from '@shared/ui';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <TopbarLayout>
      <Link to={'/diagram/new'}>Diagram</Link>
    </TopbarLayout>
  );
};

export default Dashboard;
