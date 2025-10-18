import { Route, Routes } from 'react-router-dom';
import { authRoutes } from './auth-routes';
import { useMemo } from 'react';
import { AppRouteObject } from '@/types/router.type';
import { dashboardRoutes } from './dashboard-routes';

const renderRoute = (route: AppRouteObject) => {
  const key = route.id ?? route.path ?? Math.random().toString();
  const { children, path, element } = route;

  return (
    <Route key={key} path={path} element={element}>
      {children && children.map((child) => renderRoute(child))}
    </Route>
  );
};

const getAuthorisedRoutes = (user: unknown) => {
  const authenticated = dashboardRoutes;
  const authorised: AppRouteObject[] = [];

  if (user) {
    authorised.push(...authenticated);
  }

  //TODO: handle role based routes

  return authorised;
};

const Router = () => {
  //TODO: get from the auth module
  const user = null;

  const routes = useMemo(() => {
    const baseRoutes = [...authRoutes];
    const authorized = getAuthorisedRoutes(user);

    return [...baseRoutes, ...authorized];
  }, [user]);

  return <Routes>{routes.map((route) => renderRoute(route))}</Routes>;
};

export default Router;
