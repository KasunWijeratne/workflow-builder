import { Route, Routes } from 'react-router-dom';
import { authRoutes } from './auth-routes';
import { AppRouteObject } from '@/types/router.type';
import { dashboardRoutes } from './dashboard-routes';
import RootRoute from './root-route';
import { diagramRoutes } from './diagram-routes';

const renderRoute = (route: AppRouteObject) => {
  const key = route.id ?? route.path ?? Math.random().toString();
  const { children, path, element } = route;

  return (
    <Route key={key} path={path} element={element}>
      {children && children.map((child) => renderRoute(child))}
    </Route>
  );
};

const Router = () => {
  const routes = [...authRoutes, ...dashboardRoutes, ...diagramRoutes];

  return (
    <Routes>
      <Route path="/" element={<RootRoute />} />
      {routes.map((route) => renderRoute(route))}
    </Routes>
  );
};

export default Router;
