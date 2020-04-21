import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import LoginInfo from '../LoginInfo'

import styles from './index.scss'

class Header extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    innerRef: PropTypes.object,
    jumpTo: PropTypes.func,
  }

  get isLoggedIn() {
    return Boolean(globals.user)
  }

  handleLinkClick = link => () => {
    this.props.jumpTo(link)
  }

  render() {
    const { className, innerRef } = this.props
    const logo = globals.config.logo || '/assets/logo.png'

    return (
      <div ref={innerRef} className={classnames(styles.header, className)}>
        {/* <Link to="/">
          <img className={styles.logo} src={logo} alt="" />
        </Link> */}
        <div className="header-bottom" />
        <div className={styles.right}>
          <LoginInfo className={styles.loginInfo} />
        </div>
      </div>
    )
  }
}

export default Header
