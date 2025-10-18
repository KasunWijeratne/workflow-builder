import { RouteObject } from 'react-router-dom';

//TODO: move this to types module
enum RoutePermission {
  VIEWER = 'VIEWER',
  EDITOR = 'EDITOR',
}

export interface RouteMetadata {
  title?: string;
  description?: string;
  permissions: RoutePermission[];
  icon?: string;
}

export interface AppRouteObject extends Omit<RouteObject, 'children'> {
  path?: string;
  element?: React.ReactNode;
  meta?: RouteMetadata;
  children?: AppRouteObject[];
}
