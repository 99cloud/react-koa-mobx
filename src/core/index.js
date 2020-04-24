/*
 * Created: Fri Apr 24 2020
 * Author: Apple
 */

import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'
import { syncHistoryWithStore } from 'mobx-react-router'
import { AppContainer } from 'react-hot-loader'
import { Spin } from 'antd'

import request from 'utils/request'

import RootStore from 'stores/root'
import App from './App'
import GlobalValue from './global'
import i18n from './i18n'

require('@babel/polyfill')
require('utils/polyfills')

// request error handler
window.onunhandledrejection = function(e) {
  if (e && (e.status === 'Failure' || e.status >= 400)) {
    if (e.status === 401) {
      /* eslint-disable no-alert */
      location.href = `/login?referer=${location.pathname}`
      window.alert(
        t(
          'Session timeout or this account is logged in elsewhere, please login again'
        )
      )
    } else if (globals.config.enableErrorNotify && (e.reason || e.message)) {
      window.alert('timeout')
    }
  }
}

window.t = i18n.t

window.request = request

globals.app = new GlobalValue()

const store = new RootStore()
const browserHistory = createBrowserHistory()
const history = syncHistoryWithStore(browserHistory, store.routing)

const render = component => {
  ReactDOM.render(
    <AppContainer>
      <Suspense fallback={<Spin wrapperClassName="page-loading" />}>
        {component}
      </Suspense>
    </AppContainer>,
    document.getElementById('root')
  )
}

render(<App rootStore={store} history={history} />)

module.hot &&
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default
    render(<NextApp rootStore={store} history={history} />)
  })
