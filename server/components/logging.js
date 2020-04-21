const logger = require('koa-logger')
const moment = require('moment-mini')

module.exports = function(app) {
  if (!global.MODE_DEV) {
    app.use(
      logger(str => {
        /* eslint-disable no-console */
        console.log(str, moment().format('YYYY/MM/DDTHH:mm:ss.SSS'))
      })
    )
  }
}
