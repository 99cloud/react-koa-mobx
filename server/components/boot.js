/*
 * Created: Tue Apr 21 2020
 * Author: Apple
 */

const compress = require('koa-compress')
const mount = require('koa-mount')
const render = require('koa-ejs')
const serve = require('koa-static')

const { getServerConfig, root } = require('../libs/utils')

const serverConfig = getServerConfig().server

module.exports = function(app) {
  // compress middleware
  app.use(
    compress({
      filter(content_type) {
        return /(text|javascript)/i.test(content_type)
      },
      threshold: 2048,
      flush: require('zlib').Z_SYNC_FLUSH,
    })
  )

  // serve static files
  const httpStatic = serverConfig.http.static[process.env.NODE_ENV]
  for (const [k, v] of Object.entries(httpStatic)) {
    app.use(mount(k, serve(root(v), { index: false, maxage: 604800000 })))
  }

  if (global.MODE_DEV) {
    app.use(async (ctx, next) => {
      if (
        /(\.hot-update\.)|(\.(ttf|otf|eot|woff2?)(\?.+)?$)|(\.js$)/.test(
          ctx.url
        )
      ) {
        ctx.redirect(`http://localhost:8080${ctx.url}`)
      } else {
        await next()
      }
    })
  }

  render(app, {
    root: root('server/views'),
    cache: !global.MODE_DEV,
    layout: false,
  })
}
