const isEmpty = require('lodash/isEmpty')

const { login } = require('../services/session')
const { renderLogin } = require('./view')
const {
  isValidReferer,
  isAppsRoute,
  decryptPassword,
} = require('../libs/utils')

const handleLogin = async ctx => {
  const params = ctx.request.body

  let referer = ctx.cookies.get('referer')
  referer = referer ? decodeURIComponent(referer) : ''

  const error = {}
  let user = null

  if (
    isEmpty(params) ||
    !params.username ||
    !(params.password || params.encrypt)
  ) {
    Object.assign(error, {
      status: 400,
      reason: 'Invalid Login Params',
      message: 'invalid login params',
    })
  }

  if (isEmpty(error)) {
    try {
      if (params.encrypt) {
        params.password = decryptPassword(params.encrypt, ctx.session.salt)
        delete params.encrypt
      }

      user = await login(params, { 'x-client-ip': ctx.request.ip })
      if (!user) {
        Object.assign(error, {
          status: 400,
          reason: 'Internal Server Error',
          message: 'username or password wrong, please try again',
        })
      }
    } catch (err) {
      ctx.app.emit('error', err)

      switch (err.code) {
        case 401:
          ctx.session.errorCount += 1
          Object.assign(error, {
            status: err.code,
            reason: 'User Not Match',
            message: 'username or password wrong, please try again',
          })
          break
        case 429:
          Object.assign(error, {
            status: err.code,
            reason: 'Too Many Requests',
            message: 'too many failed login attempts, please wait!',
          })
          break
        case 502:
          Object.assign(error, {
            status: err.code,
            reason: 'Internal Server Error',
            message: 'unable to access backend services',
          })
          break
        case 'ETIMEDOUT':
          Object.assign(error, {
            status: 400,
            reason: 'Internal Server Error',
            message: 'unable to access gateway',
          })
          break
        default:
          Object.assign(error, {
            status: err.code,
            reason: err.statusText,
            message: err.message,
          })
      }
    }
  }

  if (!isEmpty(error) || !user) {
    ctx.request.error = error
    return await renderLogin(ctx)
  }

  const lastUser = ctx.cookies.get('currentUser')

  ctx.session = {}
  ctx.cookies.set('token', user.token)
  ctx.cookies.set('currentUser', user.username, { httpOnly: false })
  ctx.cookies.set('referer', null)

  if (lastUser && lastUser !== user.username) {
    return ctx.redirect('/')
  }

  ctx.redirect(isValidReferer(referer) ? referer : '/')
}

const handleLogout = async ctx => {
  ctx.cookies.set('token', null)
  ctx.cookies.set('currentUser', null)

  const { origin = '', referer = '' } = ctx.headers
  const refererPath = referer.replace(origin, '')
  if (isAppsRoute(refererPath)) {
    ctx.redirect(refererPath)
  } else {
    ctx.redirect('/login')
  }
}

module.exports = {
  handleLogin,
  handleLogout,
}
