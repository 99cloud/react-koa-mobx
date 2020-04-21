const request = require('./request.base')
const { getServerConfig } = require('./utils')

const { server: serverConfig } = getServerConfig()

/**
 *  gateway api request, if get logined resource, token must exists,
 * @param {options} options: { token, method, url, params }
 */
const send_gateway_request = ({ method, url, params, token, headers = {} }) => {
  const options = {}

  if (token) {
    options.headers = {
      Authorization: `Bearer ${token}`,
      'content-type': headers['content-type'] || 'application/json',
      'x-client-ip': headers['x-client-ip'],
    }
  }

  return request[method.toLowerCase()](
    `${serverConfig.gatewayServer.url}${url}`,
    params,
    options
  )
}

module.exports = {
  send_gateway_request,
}
