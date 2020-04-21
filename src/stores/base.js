import { get } from 'lodash'
import { action, observable } from 'mobx'

// import { getFilterString } from 'utils'

import List from './base.list'

export default class BaseStore {
  list = new List()

  @observable
  detail = {}

  @observable
  isLoading = true

  @observable
  isSubmitting = false

  constructor(module) {
    this.module = module
  }

  get apiVersion() {
    return 'api'
  }

  getListUrl = () => `${this.apiVersion}/list`

  getDetailUrl = ({ id }) => `${this.getListUrl()}/${id}`

  @action
  setModule(module) {
    this.module = module
  }

  @action
  submitting = promise => {
    this.isSubmitting = true

    setTimeout(() => {
      promise
        .catch(() => {})
        .finally(() => {
          this.isSubmitting = false
        })
    }, 500)

    return promise
  }

  @action
  async fetchList({ pageSize = 10, current = 1 } = {}) {
    this.list.isLoading = true
    const params = {
      pageSize,
      current,
    }

    const result = await request.get(this.getListUrl(), params)

    const data = get(result, 'items', [])

    this.list.update({
      data,
      total: data.length || 0,
      pageSize: Number(pageSize) || 10,
      current: Number(current) || 1,
      isLoading: false,
      ...(this.list.silent ? {} : { selectedRowKeys: [] }),
    })

    return data
  }

  @action
  async fetchDetail({ id }) {
    this.loading = true

    const result = await request.get(this.getDetailUrl({ id }))

    const detail = result.data

    this.detail = detail
    this.loading = false
    return detail
  }

  @action
  setSelectRowKeys(selectedRowKeys) {
    this.list.selectedRowKeys.replace(selectedRowKeys)
  }

  @action
  create(data) {
    const namespace = get(data, 'metadata.namespace')

    if (!namespace) {
      return
    }

    return this.submitting(request.post(this.getListUrl({ namespace }), data))
  }

  @action
  update({ name, namespace }, newObject) {
    return this.submitting(
      request.put(this.getDetailUrl({ name, namespace }), newObject)
    )
  }

  @action
  patch({ name, namespace }, newObject) {
    return this.submitting(
      request.patch(this.getDetailUrl({ name, namespace }), newObject)
    )
  }

  @action
  delete({ name, namespace }) {
    return this.submitting(
      request.delete(this.getDetailUrl({ name, namespace }))
    )
  }

  @action
  batchDelete(rowKeys) {
    return this.submitting(
      Promise.all(
        rowKeys.map(name => {
          const item = this.list.data.find(_item => _item.name === name)
          return request.delete(this.getDetailUrl(item))
        })
      )
    )
  }
}
