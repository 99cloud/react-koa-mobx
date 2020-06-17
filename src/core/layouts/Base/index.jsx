/*
 * Created: Fri Apr 24 2020
 * Author: Apple
 */

import React, { Component } from 'react'
import { Layout } from 'antd'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { renderRoutes } from 'react-router-config'

import { GlobalNav, LoginInfo, Breadcrumb } from 'components/Layout'

import styles from './index.scss'

const { Header, Sider } = Layout

const LogoCom = () => (
  <div className={styles.logo}>
    <Link to="/">
      <img src={globals.config.logo || '/assets/logo.svg'} alt="logo" />
      React-koa-mobx
    </Link>
  </div>
)

@inject('rootStore')
@observer
class BaseLayout extends Component {
  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.object,
  }

  constructor(props) {
    super(props)

    this.navRef = React.createRef()

    this.routes = props.route.routes
  }

  componentWillUpdate() {
    if (!globals.user) {
      location.href = '/login'
    }
  }

  render() {
    const { location, match } = this.props

    return (
      <Layout className={styles.base}>
        <Header className="header">
          <LogoCom />
          <GlobalNav
            innerRef={this.navRef}
            match={match}
            location={location}
            navs={globals.app.getGlobalNavs()}
            className={styles.nav}
          />
          <LoginInfo className={styles.logininfo} />
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <GlobalNav
              innerRef={this.navRef}
              match={match}
              location={location}
              navs={globals.app.getGlobalNavs()}
              isTopMenu={false}
            />
          </Sider>
          <Layout className={styles.content}>
            <div className={styles.breadcrumb}>
              <Breadcrumb location={location} routes={this.routes} />
            </div>
            <div className={styles.main}>{renderRoutes(this.routes)}</div>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

export default BaseLayout
