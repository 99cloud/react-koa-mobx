import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Tooltip } from 'antd'
import Icon from 'components/Icon'

import styles from './index.scss'

export default class Item extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    tooltips: PropTypes.string,
  }

  static defaultProps = {
    value: '-',
    tooltips: '',
  }

  render() {
    const { name, value, tooltips, className } = this.props
    return (
      <li className={classnames(styles.item, className)}>
        <div className={styles.name}>
          <span>{name}: </span>
          {tooltips !== '' && (
            <Tooltip title={tooltips} placement="topLeft">
              <span>
                <Icon name="iconquestion" size={14} />
              </span>
            </Tooltip>
          )}
        </div>
        <div className={styles.value}>{value}</div>
      </li>
    )
  }
}
