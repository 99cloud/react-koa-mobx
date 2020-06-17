/*
 * Created: Fri May 22 2020
 * Author: Apple
 */

import { observable, action } from 'mobx'
import { get } from 'lodash'

export default class HomeStore {
  @observable name = 'sun'

  getListUrl = () => `api/list`

  @action
  changeName() {
    if (this.name === 'sun') {
      this.name = 'wen'
    } else {
      this.name = 'sun'
    }
  }

  @action
  async fetchList({ pageSize, current }) {
    const parmas = {
      pageSize,
      current,
    }
    const result = await request.get('api/list', parmas)

    const data = get(result, 'items', [])

    return data
  }
}
