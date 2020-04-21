import React from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { trimEnd } from 'lodash'

import NavItem from './item'

import styles from './index.scss'

const Brand = () => (
  <div className={styles.brand}>
    <Link to="/">
      {/* <img
        className={styles.logo}
        src={globals.config.logo || '/assets/logo.png'}
        alt="logo"
      /> */}
    </Link>
  </div>
)

class GlobalNav extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    navs: PropTypes.array.isRequired,
    prefix: PropTypes.string,
    checkSelect: PropTypes.func,
    onItemClick: PropTypes.func,
    innerRef: PropTypes.object,
  }

  static defaultProps = {
    className: '',
    prefix: '',
    checkSelect() {},
    onItemClick() {},
  }

  get currentPath() {
    const {
      location: { pathname },
      match: { url },
    } = this.props

    const length = trimEnd(url, '/').length
    return pathname.slice(length + 1)
  }

  render() {
    const { className, navs, innerRef, onItemClick } = this.props
    const classNames = classnames(styles.wrapper, className)

    return (
      <div ref={innerRef} className={classNames}>
        <Brand />
        <Menu
          mode="inline"
          theme="dark"
          defaultSelectedKeys={navs[0].name}
          className={styles.menu}
        >
          {navs.map(nav => (
            <NavItem
              key={nav.name}
              item={nav}
              prefix=""
              current={this.currentPath}
              onClick={onItemClick}
            />
          ))}
        </Menu>
      </div>
    )
  }
}

export default GlobalNav
