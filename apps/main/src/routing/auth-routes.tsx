import { AppRouteObject } from '@/types/router.type';
import { LinearProgress } from '@shared/ui';
import React, { Suspense } from 'react';

const Login = React.lazy(() => import('@/app/auth/login'));
const SignUp = React.lazy(() => import('@/app/auth/signup'));

export const authRoutes: AppRouteObject[] = [
  {
    path: '/login',
    meta: {
      permissions: [],
    },
    element: (
      <Suspense fallback={<LinearProgress />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: '/signup',
    meta: {
      permissions: [],
    },
    element: (
      <Suspense fallback={<LinearProgress />}>
        <SignUp />
      </Suspense>
    ),
  },
];
