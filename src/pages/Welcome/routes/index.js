/*
 * Created: Tue Apr 21 2020
 * Author: Apple
 */

import { withProps } from 'utils'
import DetailLayout from 'core/layouts/Detail'
import Welcome from 'pages/Welcome'
import Detail from 'pages/Welcome/Detail'

const PATH = '/welcome'

export default [
  {
    path: PATH,
    component: Welcome,
    exact: true,
    breadcrumbName: 'Welcome',
  },
  {
    path: `${PATH}/:id`,
    component: withProps(DetailLayout, {
      module: 'welcome',
      component: Detail,
    }),
    breadcrumbName: 'Detail',
  },
]
