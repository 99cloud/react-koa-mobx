import { isObject } from 'lodash'
import yaml from 'js-yaml/dist/js-yaml'

export const getValue = (mode, value) => {
  if (isObject(value)) {
    try {
      return mode === 'yaml' ? yaml.safeDump(value) : ''
    } catch (err) {
      console.error(err)
      return JSON.stringify(value, null, 2)
    }
  }
  return String(value)
}

export const getValueObj = (mode, value) => {
  if (!isObject(value)) {
    try {
      return mode === 'yaml' ? yaml.safeLoad(value) : {}
    } catch (err) {}
  }
  return value
}

export const getAllYAMLValue = value => {
  const objs = []

  try {
    yaml.safeLoadAll(value, obj => {
      objs.push(obj)
    })
  } catch (err) {}

  return objs
}
