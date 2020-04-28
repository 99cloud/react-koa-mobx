/*
 * Created: Fri Apr 24 2020
 * Author: Apple
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Router } from 'react-router'
import { renderRoutes } from 'utils/router.config'
import { Provider } from 'mobx-react'

import 'antd/dist/antd.css'
import 'scss/main.scss'

import routes from './routes'

class App extends Component {
  static propTypes = {
    rootStore: PropTypes.object,
    history: PropTypes.object,
  }

  render() {
    const { rootStore, history } = this.props

    return (
      <Provider rootStore={rootStore}>
        <Router history={history}>{renderRoutes(routes)}</Router>
      </Provider>
    )
  }
}

export default App
