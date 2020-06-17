/*
 * Created: Tue Apr 21 2020
 * Author: Apple
 */

const Router = require('koa-router')
const convert = require('koa-convert')
const bodyParser = require('koa-bodyparser')

const proxy = require('./middlewares/proxy')

const { handleApiProxy } = require('./proxy')

const { handleLogin, handleLogout } = require('./controllers/session')

const { renderView, renderLogin } = require('./controllers/view')

const parseBody = convert(
  bodyParser({
    formLimit: '200kb',
    jsonLimit: '200kb',
    bufferLimit: '4mb',
  })
)

const router = new Router()

router
  .use(proxy('/(k)?api(s)?/(.*)', handleApiProxy))

  .post('/login', parseBody, handleLogin)
  .post('/logout', handleLogout)
  .get('/login', renderLogin)

  // page entry
  .all('*', renderView)

module.exports = router
