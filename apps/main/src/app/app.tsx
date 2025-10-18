import Router from '@/routing/router';
import { initAuth } from '@shared/auth';

initAuth();

function App() {
  return <Router />;
}

export default App;
