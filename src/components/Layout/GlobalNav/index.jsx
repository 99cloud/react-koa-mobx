/*
 * Created: Tue Apr 21 2020
 * Author: Apple
 */

import React from 'react'
import { Menu } from 'antd'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { trimEnd } from 'lodash'

import NavItem from './item'

class GlobalNav extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    navs: PropTypes.array.isRequired,
    prefix: PropTypes.string,
    checkSelect: PropTypes.func,
    onItemClick: PropTypes.func,
    innerRef: PropTypes.object,
    isTopMenu: PropTypes.bool,
  }

  static defaultProps = {
    className: '',
    prefix: '',
    checkSelect() {},
    onItemClick() {},
    isTopMenu: true,
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
    const { className, navs, innerRef, onItemClick, isTopMenu } = this.props
    const classNames = classnames(className)

    return (
      <div ref={innerRef} className={classNames}>
        <Menu
          mode={isTopMenu ? 'horizontal' : 'inline'}
          theme="dark"
          defaultSelectedKeys={navs[0].name}
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
