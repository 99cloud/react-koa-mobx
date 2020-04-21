const { getServerConfig } = require('./libs/utils')

const { server: serverConfig } = getServerConfig()

const NEED_OMIT_HEADERS = ['cookie', 'referer']

const handleApiProxy = {
  target: serverConfig.gatewayServer.url,
  changeOrigin: true,
  events: {
    proxyReq(proxyReq, req) {
      // Set authorization
      proxyReq.setHeader('Authorization', `Bearer ${req.token}`)

      NEED_OMIT_HEADERS.forEach(key => proxyReq.removeHeader(key))
    },
  },
}

module.exports = {
  handleApiProxy,
}
