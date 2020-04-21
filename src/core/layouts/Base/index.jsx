import React, { Component } from 'react'
import { Row, Col } from 'antd'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { inject, observer } from 'mobx-react'
import { renderRoutes } from 'utils/router.config'

import { Header, GlobalNav, Breads } from 'components/Layout'

import styles from './index.scss'

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
    this.headerRef = React.createRef()

    this.routes = props.route.routes
  }

  componentWillUpdate() {
    if (!globals.user) {
      location.href = '/login'
    }
  }

  componentDidUpdate(nextProps) {
    if (nextProps.rootStore.showGlobalNav) {
      // document.removeEventListener('click', this.handleClick)
      // document.addEventListener('click', this.handleClick)
    }
  }

  handleClick = e => {
    if (this.navRef.current && !this.navRef.current.contains(e.target)) {
      this.props.rootStore.hideGlobalNav()
      document.removeEventListener('click', this.handleClick)
    }
  }

  handleNavItemClick = () => {
    // this.props.rootStore.hideGlobalNav()
  }

  handleJumpTo = link => {
    this.props.rootStore.routing.push(link)
  }

  render() {
    const { location, match, rootStore } = this.props
    return (
      <div>
        <Row className={styles.base}>
          <Col xs={4} sm={4} md={4} lg={4} xl={4}>
            <GlobalNav
              innerRef={this.navRef}
              className={classnames({
                [styles.nav]: !rootStore.showGlobalNav,
              })}
              match={match}
              location={location}
              navs={globals.app.getGlobalNavs()}
              onItemClick={this.handleNavItemClick}
            />
          </Col>
          <Col xs={20} sm={20} md={20} lg={20} xl={20}>
            <Header
              innerRef={this.headerRef}
              className={styles.header}
              location={location}
              onToggleNav={rootStore.toggleGlobalNav}
              jumpTo={this.handleJumpTo}
            />
            <div className={styles.main}>{renderRoutes(this.routes)}</div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default BaseLayout
