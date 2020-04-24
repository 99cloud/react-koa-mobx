/*
 * Created: Fri Apr 24 2020
 * Author: Apple
 */

import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import moment from 'moment-mini'
import get from 'lodash/get'
import cookie from 'utils/cookie'
import { getBrowserLang } from 'utils'
import zh_JSON from '../locales/zh/translation.json'
import en_JSON from '../locales/en/translation.json'

const resources = {
  en: {
    translations: en_JSON,
  },
  zh: {
    translations: zh_JSON,
  },
}

const defaultLang = get(globals.user, 'lang')
if (defaultLang && cookie('lang') !== defaultLang) {
  cookie('lang', defaultLang)
}

let lang = cookie('lang') || getBrowserLang()

if (!lang) {
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

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    preload: ['en', 'zh'],
    fallbackLng: 'en', // 设置缺失备用语言，若要加载的语言存在某个键值缺失，则用fallbackLng来代替
    debug: false,
    lng: lang,

    // have a common namespace used around the full app
    ns: ['translations'],
    defaultNS: 'translations',

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })

export default {
  t: i18n.t.bind(i18n),
  i18n,
}
