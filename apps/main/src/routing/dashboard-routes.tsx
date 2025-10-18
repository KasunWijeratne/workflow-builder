import { AppRouteObject } from '@/types/router.type';
import React, { Suspense } from 'react';
import { Role } from '@shared/auth';
import { ProtectedRoute } from './protected-route';

const Dashboard = React.lazy(() => import('@/app/dashboard/dashboard'));

export const dashboardRoutes: AppRouteObject[] = [
  {
    path: '/dashboard',
    meta: {
      permissions: [Role.EDITOR],
    },
    element: (
      <ProtectedRoute permissions={[Role.EDITOR]}>
        <Suspense fallback={null}>
          <Dashboard />
        </Suspense>
      </ProtectedRoute>
    ),
  },
];
