/*
 * Created: Fri Apr 24 2020
 * Author: Apple
 */
import React from 'react'
import BaseLayout from 'core/layouts/Base'
import NotFound from 'components/NotFound'

import welcomeRoutes from 'pages/Welcome/routes'

const Home = () => (
  <div>
    <h1 className="py-3">Home</h1>
  </div>
)

export default [
  { path: '/404', component: NotFound, exact: true },
  {
    component: BaseLayout,
    routes: [
      {
        path: '/',
        component: Home,
        breadcrumbName: 'Home',
        exact: true,
      },
      ...welcomeRoutes,
      {
        path: '*',
        component: NotFound,
      },
    ],
  },
]
