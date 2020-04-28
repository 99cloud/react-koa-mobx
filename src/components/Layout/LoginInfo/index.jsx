/*
 * Created: Tue Apr 21 2020
 * Author: Apple
 */

import React, { Component } from 'react'
import { Dropdown, Menu } from 'antd'
import {
  CaretDownFilled,
  SettingFilled,
  RightCircleOutlined,
} from '@ant-design/icons'
import { inject, observer } from 'mobx-react'
import classnames from 'classnames'

// import UserStore from 'stores/user'

import styles from './index.scss'

@inject('rootStore')
@observer
export default class LoginInfo extends Component {
  static propTypes = {}

  constructor(props) {
    super(props)

    // this.store = new UserStore()
    this.state = {
      // showUserEdit: false,
    }
  }

  handleMoreClick = ({ key }) => {
    switch (key) {
      case 'language':
        this.props.rootStore.switchLang()
        break
      case 'logout':
        this.props.rootStore.logout()
        break
      default:
        break
    }
  }

  renderDropDown() {
    return (
      <Menu onClick={this.handleMoreClick}>
        <Menu.Item key="language">
          <SettingFilled />
          {t('Language')}
        </Menu.Item>
        <Menu.Item key="logout">
          <RightCircleOutlined />
          {t('Logout')}
        </Menu.Item>
      </Menu>
    )
  }

  render() {
    const { className } = this.props

    return (
      <div className={classnames(styles.logined, className)}>
        <Dropdown overlay={this.renderDropDown()} placement="bottomRight">
          <div className={classnames(styles.name)}>
            {globals.user.name || 'admin-default'}
            <CaretDownFilled className={styles.down} />
          </div>
        </Dropdown>
      </div>
    )
  }
}
