import { AppRouteObject } from '@/types/router.type';
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
      <Suspense fallback={null}>
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
      <Suspense fallback={null}>
        <SignUp />
      </Suspense>
    ),
  },
];
