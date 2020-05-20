/*
 * Created: Sun Apr 26 2020
 * Author: Apple
 */

import { get } from 'lodash'
import { action, observable } from 'mobx'

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
  async fetchList({ pageSize = 10, current = 1, ...filters } = {}) {
    this.list.isLoading = true
    const params = {
      pageSize,
      current,
      ...filters,
    }

    const result = await request.get(this.getListUrl(), params)

    const data = get(result, 'items', [])

    this.list.update({
      data,
      total: data.length || 0,
      pageSize: Number(pageSize) || 10,
      current: Number(current) || 1,
      isLoading: false,
      filters,
      selectedRowKeys: [],
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
    return this.submitting(request.post(this.getListUrl(), data))
  }

  @action
  update(newObject) {
    return this.submitting(request.put(this.getListUrl(), newObject))
  }

  @action
  patch({ name, namespace }, newObject) {
    return this.submitting(
      request.patch(this.getDetailUrl({ name, namespace }), newObject)
    )
  }

  @action
  delete({ id }) {
    return this.submitting(request.delete(this.getDetailUrl({ id })))
  }

  @action
  batchDelete(rowKeys) {
    return this.submitting(
      Promise.all(
        rowKeys.map(name => request.delete(this.getDetailUrl({ id: name })))
      )
    )
  }
}
