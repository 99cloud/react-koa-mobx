const isEmpty = require('lodash/isEmpty')
const isUndefined = require('lodash/isUndefined')
const { send_gateway_request } = require('../libs/request')

module.exports = async (ctx, next) => {
  if (ctx.headers['x-check-exist']) {
    try {
      ctx.body = await send_gateway_request({
        method: ctx.method,
        headers: ctx.headers,
        url: ctx.url,
        token: ctx.cookies.get('token'),
      })

      ctx.status = 200

      // custom api rules
      if (!isUndefined(ctx.body.items)) {
        ctx.body = { exist: !isEmpty(ctx.body.items) }
        return
      }

      if (!isUndefined(ctx.body.total)) {
        ctx.body = { exist: ctx.body.total > 0 }
        return
      }

      if (!isUndefined(ctx.body.annotations)) {
        ctx.body = { exist: !!ctx.body.annotations }
        return
      }

      if (!isUndefined(ctx.body.exist)) {
        ctx.body = { exist: ctx.body.exist }
        return
      }

      ctx.body = { exist: true }
    } catch (error) {
      ctx.body = { exist: false }
    }
  } else {
    return await next()
  }
}
