/*
 * Created: Tue Apr 21 2020
 * Author: Apple
 */

const { getCurrentUser } = require('../services/session')

const {
  getServerConfig,
  getFileVersion,
  isValidReferer,
} = require('../libs/utils')

const { client: clientConfig } = getServerConfig()

const renderView = async ctx => {
  try {
    const { user, config } = await getCurrentUser(ctx)

    await ctx.render('index', {
      isDev: global.MODE_DEV,
      title: config.title,
      config: JSON.stringify(config),
      user: JSON.stringify(user),
      version: getFileVersion,
    })
  } catch (err) {
    ctx.app.emit('error', err)
    if (err) {
      if (err.code === 401 || err.status === 401) {
        if (isValidReferer(ctx.path)) {
          ctx.redirect(`/login?referer=${ctx.path}`)
        } else {
          ctx.redirect('/login')
        }
      } else if (err.code === 502) {
        await ctx.render('error', {
          title: clientConfig.title,
          t: ctx.t.bind(ctx),
          message: 'unable to access backend services',
        })
      } else if (err.code === 'ETIMEDOUT') {
        await ctx.render('error', {
          title: clientConfig.title,
          t: ctx.t.bind(ctx),
          message: 'unable to access gateway',
        })
      }
    } else {
      await ctx.render('error', {
        title: clientConfig.title,
        t: ctx.t.bind(ctx),
      })
    }
  }
}

const renderLogin = async ctx => {
  let loginPath = '/login'

  if (isValidReferer(ctx.query.referer)) {
    loginPath += `?referer=${ctx.query.referer}`
  }

  ctx.cookies.set('referer', ctx.query.referer)

  await ctx.render('login', {
    loginPath,
    title: clientConfig.title,
    error: ctx.request.error,
    t: ctx.t.bind(ctx),
  })
}

module.exports = {
  renderView,
  renderLogin,
}
