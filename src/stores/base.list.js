import { action, observable } from 'mobx'

export default class List {
  data = []

  current = 1

  pageSize = 10

  @observable
  total = 0

  @observable
  isLoading = true

  @observable
  selectedRowKeys = []

  @action
  update(params) {
    Object.keys(params).forEach(key => {
      this[key] = params[key]
    })
  }

  reset() {
    this.data = []
    this.current = 1
    this.pageSize = 10
    this.isLoading = true
    this.selectedRowKeys = []
  }
}
