import Welcome from '../containers/Welcome'

import welcome from './welcome'

export default [
  ...welcome,
  { path: `/welcome`, component: Welcome, exact: true },
  {
    path: `/`,
    redirect: { from: `/`, to: `/welcome`, exact: true },
  },
  // {
  //   path: '*',
  //   redirect: { from: '*', to: '/404', exact: true },
  // },
]
