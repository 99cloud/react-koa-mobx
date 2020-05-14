/*
 * Created: Fri Apr 24 2020
 * Author: Apple
 */

import React, { Component } from 'react'
import { Layout, Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { renderRoutes } from 'react-router-config'

import { GlobalNav, LoginInfo } from 'components/Layout'

import styles from './index.scss'

const { Header, Sider } = Layout

const LogoCom = () => (
  <div className={styles.logo}>
    <Link to="/">
      {/* <img src={globals.config.logo || '/assets/logo.png'} alt="logo" /> */}
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
              onItemClick={this.handleNavItemClick}
              isTopMenu={false}
            />
          </Sider>
          <Layout className={styles.content}>
            <div className={styles.breadcrumb}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div className={styles.main}>{renderRoutes(this.routes)}</div>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

export default BaseLayout
