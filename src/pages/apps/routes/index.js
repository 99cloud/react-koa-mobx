/*
 * Created: Tue Apr 21 2020
 * Author: Apple
 */

import Welcome from '../containers/Welcome'

import welcome from './welcome'

export default [
  ...welcome,
  { path: `/welcome`, component: Welcome, exact: true },
]
