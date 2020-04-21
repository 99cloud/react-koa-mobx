import { get } from 'lodash'

const _cache_ = {}

export default {
  get: (key, subKey = location.pathname) => get(_cache_, `${key}.${subKey}`),
  set: (key, data, subKey = location.pathname) => {
    _cache_[key] = { [subKey]: data }
  },
  delete: key => {
    delete _cache_[key]
  },
}
