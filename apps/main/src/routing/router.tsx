import { Route, Routes } from 'react-router-dom';
import { authRoutes } from './auth-routes';
import { useMemo } from 'react';
import { AppRouteObject } from '@/types/router.type';

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
  const routes = useMemo(() => {
    const baseRoutes = [...authRoutes];

    return [...baseRoutes];
  }, []);

  return <Routes>{routes.map((route) => renderRoute(route))}</Routes>;
};

export default Router;
