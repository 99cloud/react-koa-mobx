import { withProps } from 'utils'

import DetailLayout from 'core/layouts/Detail'

import Detail from '../containers/Welcome/Detail'

const PATH = '/welcome/:id'

export default [
  {
    path: PATH,
    component: withProps(DetailLayout, {
      module: 'welcome',
      component: Detail,
      breadcrumbs: [{ label: 'Welcome', url: '/welcome/:id' }],
    }),
  },
]
