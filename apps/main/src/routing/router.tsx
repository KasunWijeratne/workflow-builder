import { Outlet, Route, Routes } from 'react-router-dom';
import { authRoutes } from './auth-routes';
import { AppRouteObject } from '@/types/router.type';
import { dashboardRoutes } from './dashboard-routes';
import { diagramRoutes } from './diagram-routes';
import RootRoute from './root-route';
import { TopbarLayout } from '@shared/ui';
import UserMenu from '@/components/UserMenu';

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
  const routes = [...dashboardRoutes, ...diagramRoutes];

  return (
    <Routes>
      <Route path="/" element={<RootRoute />}>
        {authRoutes.map((route) => renderRoute(route))}
      </Route>
      <Route element={<MainLayout />}>
        {routes.map((route) => renderRoute(route))}
      </Route>
    </Routes>
  );
};

const MainLayout = () => {
  return (
    <TopbarLayout userMenu={<UserMenu />}>
      <Outlet />
    </TopbarLayout>
  );
};

export default Router;
