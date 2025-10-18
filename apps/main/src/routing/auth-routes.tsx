import { AppRouteObject } from '@/types/router.type';
import React, { Suspense } from 'react';

const Login = React.lazy(() => import('@/app/auth/login'));

export const authRoutes: AppRouteObject[] = [
  {
    path: '/login',
    meta: {
      permissions: [],
    },
    element: (
      <Suspense fallback={null}>
        <Login />
      </Suspense>
    ),
  },
];
