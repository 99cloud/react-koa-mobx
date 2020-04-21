const fetch = require('node-fetch').default
const isEmpty = require('lodash/isEmpty')
const merge = require('lodash/merge')

const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']

/**
 * This is our overly complicated isomorphic "request",
 * methods: get, post, put, patch, delete
 * @param url
 * @param params
 * @param options
 * @param reject
 * @returns {Function}
 */
module.exports = methods.reduce(
  (prev, method) => ({
    ...prev,
    [method.toLowerCase()]: (...args) => buildRequest(method, ...args),
  }),
  {}
)

/**
 * Build and execute remote request
 * @param method
 * @param url
 * @param params
 * @param config
 */
function buildRequest(method, url, params = {}, options) {
  let requestURL = createURL(url)
  const request = merge(
    {
      method,
      mode: 'cors',
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
    },
    options
  )

  if (method === 'GET') {
    requestURL += !isEmpty(params) ? toQueryString(omitNil(params)) : ''
  } else {
    request.body = JSON.stringify(params)
  }

  return fetch(requestURL, request).then(handleResponse)
}
/**
 * Prepend host of API server
 * @param path
 * @returns {String}
 * @private
 */
function createURL(path) {
  if (path.startsWith('http')) {
    return path
  } else if (process.env.BROWSER) {
    return `/${path.trimLeft('/')}`
  }
  return `http://${global.HOSTNAME}:${global.PORT}/${path.trimLeft('/')}`
}

/**
 * Decide what to do with the response
 * @param response
 * @returns {Promise}
 * @private
 */
function handleResponse(response) {
  const redirect = response.redirected
  if (redirect) {
    window.location.replace(response.url)
    return Promise.reject()
  }

  const contentType = response.headers.get('content-type')

  if (contentType && contentType.includes('json')) {
    return response.json().then(res => {
      if (response.status === 401) {
        console.warn('Unauthorized', response, response.ok)
      }

      if (response.ok && response.status >= 200 && response.status < 400) {
        return res
      }

      return Promise.reject({
        code: response.status,
        ...res,
        statusText: response.statusText,
      })
    })
  }

  if (response.status === 200 || response.status === 204) {
    return response.text()
  }

  return response.text().then(text =>
    Promise.reject({
      code: response.status,
      statusText: response.statusText,
      message: text,
    })
  )
}

/**
 * Transform an JSON object to a query string
 * @param params
 * @returns {string}
 */
function toQueryString(params) {
  return `?${Object.keys(params)
    .map(k => {
      const name = encodeURIComponent(k)
      if (Array.isArray(params[k])) {
        return params[k]
          .map(val => `${name}=${encodeURIComponent(val)}`)
          .join('&')
      }
      if (k === 'q') {
        return `${name}=${params[k]}`
      }
      return `${name}=${encodeURIComponent(params[k])}`
    })
    .join('&')}`
}

function omitNil(obj) {
  if (typeof obj !== 'object') return obj
  return Object.keys(obj).reduce((acc, v) => {
    if (obj[v] !== undefined) acc[v] = obj[v]
    return acc
  }, {})
}
