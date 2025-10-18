import React, { Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import { Role } from '@shared/auth';
import { ProtectedRoute } from './protected-route';

const AllDiagrams = React.lazy(() => import('@/app/diagram/all-diagrams'));
const Diagram = React.lazy(() => import('@/app/diagram/diagram'));

export const diagramRoutes: RouteObject[] = [
  {
    path: '/workflows',
    handle: {
      permissions: [Role.EDITOR, Role.VIEWER],
    },
    element: (
      <ProtectedRoute permissions={[Role.EDITOR, Role.VIEWER]}>
        <Suspense fallback={null}>
          <AllDiagrams />
        </Suspense>
      </ProtectedRoute>
    ),
    children: [
      {
        path: ':id',
        element: (
          <ProtectedRoute permissions={[Role.EDITOR, Role.VIEWER]}>
            <Suspense fallback={null}>
              <Diagram />
            </Suspense>
          </ProtectedRoute>
        ),
      },
    ],
  },
];
