import { withProps } from 'utils'

import BaseInfo from 'components/Forms/Welcome/BaseInfo'
import Settings from 'components/Forms/Welcome/Settings'

export default [
  {
    title: 'Basic Info',
    component: withProps(BaseInfo),
    required: true,
  },
  {
    title: 'Welcome Settings',
    component: Settings,
    required: true,
  },
]
