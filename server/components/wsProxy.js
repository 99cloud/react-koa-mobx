const httpProxy = require('http-proxy')

const { getServerConfig } = require('../libs/utils')

const serverConfig = getServerConfig().server

module.exports = function(app) {
  const wsProxy = httpProxy.createProxyServer({
    ws: true,
    changeOrigin: true,
  })

  app.server.on('upgrade', (req, socket, head) => {
    const target = serverConfig.gatewayServer.wsUrl
    wsProxy.ws(req, socket, head, { target })
  })
}
