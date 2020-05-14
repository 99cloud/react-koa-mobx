/*
 * Created: Fri Apr 24 2020
 * Author: Apple
 */

import BaseLayout from 'core/layouts/Base'
import { lazy } from 'react'
import NotFound from 'components/NotFound'

const Apps = lazy(() => import(/* webpackChunkName: "apps" */ 'apps/App.jsx'))

export default [
  { path: '/404', component: NotFound, exact: true },
  {
    component: BaseLayout,
    routes: [
      {
        path: '/',
        component: Apps,
      },
    ],
  },
  {
    path: '*',
    component: Apps,
  },
]
