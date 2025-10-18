import { AppRouteObject } from '@/types/router.type';
import React, { Suspense } from 'react';

const Dashboard = React.lazy(() => import('@/app/dashboard/dashboard'));

export const dashboardRoutes: AppRouteObject[] = [
  {
    path: '/dashboard',
    meta: {
      permissions: [],
    },
    element: (
      <Suspense fallback={null}>
        <Dashboard />
      </Suspense>
    ),
  },
];
