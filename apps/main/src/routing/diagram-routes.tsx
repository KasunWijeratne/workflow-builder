import React, { Suspense } from 'react';
import { RouteObject } from 'react-router-dom';

const AllDiagrams = React.lazy(() => import('@/app/diagram/all-diagrams'));
const Diagram = React.lazy(() => import('@/app/diagram/diagram'));

export const diagramRoutes: RouteObject[] = [
  {
    path: '/workflows',
    handle: {
      permissions: [],
    },
    element: (
      <Suspense fallback={null}>
        <AllDiagrams />
      </Suspense>
    ),
    children: [
      {
        path: ':id',
        element: (
          <Suspense fallback={null}>
            <Diagram />
          </Suspense>
        ),
      },
    ],
  },
];
