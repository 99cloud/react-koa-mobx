import { get } from 'lodash'
import { observer, inject } from 'mobx-react'
import WelcomeStore from 'stores/welcome'
import Base from 'core/containers/Detail'

@inject('rootStore')
@observer
export default class WelcomeDetail extends Base {
  init() {
    this.store = new WelcomeStore()
  }

  getAttrs = () => [
    {
      name: t('Created Time'),
      value: this.createTime,
    },
    {
      name: t('Description'),
      value: get(this.store.detail, 'description'),
    },
  ]
}
