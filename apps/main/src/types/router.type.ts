import { RouteObject } from 'react-router-dom';
import { Role } from '@shared/auth';

export interface RouteMetadata {
  permissions: Role[];
  title?: string;
  description?: string;
  icon?: string;
}

export interface AppRouteObject extends Omit<RouteObject, 'children'> {
  path?: string;
  element?: React.ReactNode;
  meta?: RouteMetadata;
  children?: AppRouteObject[];
}
