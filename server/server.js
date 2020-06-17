/*
 * Created: Tue Apr 21 2020
 * Author: Apple
 */

const argv = require('yargs').argv
const semver = require('semver')

// check runtime
if (semver.lt(process.version, '7.6.0')) {
  console.error('Node Version should be greater than 7.6.0')
  process.exit(-1)
}

global.ARGV = argv || {}
global.MODE_DEV = process.env.NODE_ENV === 'development'

const Koa = require('koa')
const path = require('path')

global.APP_ROOT = path.resolve(__dirname, '../')

const { getServerConfig } = require('./libs/utils')

Koa.prototype.apply = function(module, ...rest) {
  module(this, ...rest)
  return this
}

const boot = require('./components/boot')
const locale = require('./components/locale')
const logging = require('./components/logging')
const wsProxy = require('./components/wsProxy')
const errorProcess = require('./components/errorProcess')
const routes = require('./routes')

const app = new Koa()

const serverConfig = getServerConfig().server

global.HOSTNAME = serverConfig.http.hostname || 'localhost'
global.PORT = serverConfig.http.port || 8080

app.keys = ['app->_<']

app
  .apply(boot)
  .apply(locale)
  .apply(logging)
  .apply(errorProcess)
  .use(routes.routes())

app.server = app.listen(global.PORT, err => {
  if (err) {
    return console.error(err)
  }
  /* eslint-disable no-console */
  console.log(`Dashboard app running at port ${global.PORT}`)
})

app.apply(wsProxy)
