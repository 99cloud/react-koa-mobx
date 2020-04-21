import React from 'react'
import { isEmpty, isString } from 'lodash'
import moment from 'moment-mini'

export const getQueryString = params =>
  Object.keys(params)
    .filter(key => params[key])
    .map(key => `${key}=${params[key]}`)
    .join('&')

export const cacheFunc = (key, func, context) => {
  context._funcCaches = context._funcCaches || {}

  if (!context._funcCaches[key]) {
    context._funcCaches[key] = func
  }

  return context._funcCaches[key]
}

export const withProps = (Component, props) => newProps => (
  <Component {...props} {...newProps} />
)

export const LAYOUT = {
  labelCol: {
    sm: { span: 4 },
    md: { span: 7 },
    lg: { span: 7 },
    xl: { span: 7 },
    xxl: { span: 6 },
  },
  wrapperCol: {
    sm: { span: 16 },
    md: { span: 10 },
    lg: { span: 10 },
    xl: { span: 10 },
    xxl: { span: 12 },
  },
}

export const getBrowserLang = () => {
  const lang = (navigator.language || navigator.browserLanguage).toLowerCase()

  if (lang.indexOf('zh') !== -1) {
    return 'zh'
  } else if (lang.indexOf('en') !== -1) {
    return 'en'
  }

  return globals.config.defaultLang || 'en'
}

export const getDisplayName = item => {
  if (isEmpty(item)) {
    return ''
  }

  if (item.display_name) {
    return item.display_name
  }

  return `${item.name}${item.aliasName ? `(${item.aliasName})` : ''}`
}

export const getLocalTime = time => {
  let formatTime = time

  if (time && isString(time) && time.indexOf(' +0000 UTC') !== -1) {
    formatTime = time.replace(' +0000 UTC', 'Z').replace(' ', 'T')
  }

  return moment.utc(formatTime).local()
}
