import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import styles from './index.scss'

export default class Attributes extends PureComponent {
  static propTypes = {
    children: PropTypes.any,
  }

  render() {
    return (
      <ul className={classnames(styles.attributes, this.props.className)}>
        {this.props.children}
      </ul>
    )
  }
}
