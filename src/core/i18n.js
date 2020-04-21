import moment from 'moment-mini'
import { locale } from '@pitrix/lego-ui'
import get from 'lodash/get'
import cookie from 'utils/cookie'
import { getBrowserLang } from 'utils'

import locales from '../locales'

const init = () => {
  const defaultLang = get(globals.user, 'lang')
  if (defaultLang && cookie('lang') !== defaultLang) {
    cookie('lang', defaultLang)
  }

  let lang = cookie('lang') || getBrowserLang()

  if (!locales[lang]) {
    lang = 'en'
    cookie('lang', lang)
  }

  if (lang === 'zh') {
    moment.locale('zh', {
      relativeTime: {
        s: '1秒',
        ss: '%d秒',
        m: '1分钟',
        mm: '%d分钟',
        h: '1小时',
        hh: '%d小时',
        d: '1天',
        dd: '%d天',
        M: '1个月',
        MM: '%d个月',
        y: '1年',
        yy: '%d年',
        past: '%s前',
        future: '在%s后',
      },
    })
  }

  return { locales }
}

const t = (key, options) => {
  let value = key && locale.get(key, options)

  if (options && options.defaultValue && value === key) {
    value = options.defaultValue
  }

  return value
}

t.html = (key, options) => key && locale.getHTML(key, options)

export default {
  init,
  t,
}
