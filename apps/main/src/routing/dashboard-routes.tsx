import { AppRouteObject } from '@/types/router.type';
import React, { Suspense } from 'react';
import { Role } from '@shared/auth';
import { ProtectedRoute } from './protected-route';
import { LinearProgress } from '@shared/ui';

const Dashboard = React.lazy(() => import('@/app/dashboard/dashboard'));

export const dashboardRoutes: AppRouteObject[] = [
  {
    path: '/dashboard',
    meta: {
      permissions: [Role.VIEWER],
    },
    element: (
      <ProtectedRoute permissions={[Role.VIEWER]}>
        <Suspense fallback={<LinearProgress color="secondary" />}>
          <Dashboard />
        </Suspense>
      </ProtectedRoute>
    ),
  },
];
