/*
 * Created: Tue Apr 21 2020
 * Author: Apple
 */

/* eslint-disable no-unused-vars */
const { send_gateway_request } = require('../libs/request')

const { getServerConfig } = require('../libs/utils')

const { client: clientConfig } = getServerConfig()

const login = async (data, headers) => {
  const resp = await send_gateway_request({
    method: 'POST',
    url: '/moapi/login',
    headers,
    params: data,
  })

  if (!resp.access_token) {
    throw new Error(resp.message)
  }

  return { username: data.username, token: resp.access_token }
}

const getCurrentUser = async ctx => {
  const token = ctx.cookies.get('token')
  const username = ctx.cookies.get('currentUser')

  // if (!username || !token) {
  //   ctx.throw(401, 'Not Login')
  // }

  return {
    config: { ...clientConfig },
    user: {},
  }
}

module.exports = {
  login,
  getCurrentUser,
}
