/*
 * Created: Fri Apr 24 2020
 * Author: Apple
 */
import BaseLayout from 'core/layouts/Base'
import NotFound from 'components/NotFound'

import welcomeRoutes from 'pages/Welcome/routes'
import Home from 'pages/Home'

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
