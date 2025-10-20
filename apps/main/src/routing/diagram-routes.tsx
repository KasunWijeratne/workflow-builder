import React, { Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import { Role } from '@shared/auth';
import { ProtectedRoute } from './protected-route';
import { ReactFlowProvider } from '@xyflow/react';
import { LinearProgress } from '@shared/ui';

const NewDiagram = React.lazy(() => import('@/app/diagram/new-diagram'));
const Diagram = React.lazy(() => import('@/app/diagram/diagram'));

export const diagramRoutes: RouteObject[] = [
  {
    path: '/diagram',
    handle: {
      permissions: [Role.EDITOR, Role.VIEWER],
    },
    children: [
      {
        path: 'new',
        element: (
          <ProtectedRoute permissions={[Role.EDITOR, Role.VIEWER]}>
            <Suspense fallback={<LinearProgress color="secondary" />}>
              <ReactFlowProvider>
                <NewDiagram />
              </ReactFlowProvider>
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: ':id',
        element: (
          <ProtectedRoute permissions={[Role.EDITOR, Role.VIEWER]}>
            <Suspense fallback={<LinearProgress color="secondary" />}>
              <ReactFlowProvider>
                <Diagram />
              </ReactFlowProvider>
            </Suspense>
          </ProtectedRoute>
        ),
      },
    ],
  },
];
