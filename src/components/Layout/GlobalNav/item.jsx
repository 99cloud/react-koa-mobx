import React from 'react'
import { Menu } from 'antd'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { NavLink } from 'react-router-dom'
import { SmileFilled } from '@ant-design/icons'
import Icon from 'components/Icon'

import styles from './index.scss'

const { SubMenu } = Menu

export default class NavItem extends React.Component {
  static propTypes = {
    item: PropTypes.object,
    current: PropTypes.string,
    prefix: PropTypes.string,
    onClick: PropTypes.func,
  }

  checkSelect = (item = {}) => {
    const { current } = this.props

    return current.startsWith(item.name)
  }

  renderIcon(icon) {
    return <Icon name={icon} />
  }

  render() {
    const { item, prefix, onClick } = this.props

    if (item.children) {
      return (
        <SubMenu
          key={item.name}
          title={
            <span>
              {this.renderIcon(item.icon)} <span>{item.title}</span>
            </span>
          }
          {...this.props}
        >
          {item.children.map(child => (
            <Menu.Item key={child.name} {...this.props}>
              <NavLink to={`${prefix}/${child.name}`} onClick={onClick}>
                {this.renderIcon(item.icon)} <span>{child.title}</span>
              </NavLink>
            </Menu.Item>
          ))}
        </SubMenu>
      )
    }

    return (
      <Menu.Item key={item.name} {...this.props}>
        <NavLink to={`${prefix}/${item.name}`} onClick={onClick}>
          {this.renderIcon(item.icon)} {t(item.title)}
        </NavLink>
      </Menu.Item>
    )
  }
}
