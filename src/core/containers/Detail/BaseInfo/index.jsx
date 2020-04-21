import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

import Attributes from './Attributes'

import styles from './index.scss'

class BaseInfo extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    attrs: PropTypes.array,
  }

  static defaultProps = {
    name: '',
  }

  renderName() {
    const { name } = this.props

    return (
      <div className={styles.name} title={name} data-test="detail-title">
        {name}
      </div>
    )
  }

  renderAttributes() {
    const { attrs } = this.props

    if (isEmpty(attrs)) return null

    return (
      <div className={styles.attrs} data-test="detail-attrs">
        <div className="h6">{t('Details')}</div>
        <Attributes>
          {attrs.map(({ name, value, show = true, ...rest }) => {
            if (!show) return null

            return (
              <Attributes.Item
                key={name}
                name={name}
                value={value === undefined || value === null ? '-' : value}
                {...rest}
              />
            )
          })}
        </Attributes>
      </div>
    )
  }

  render() {
    return (
      <div className={styles.card}>
        <div className={styles.base}>{this.renderName()}</div>
        <div className={styles.extra}>{this.renderAttributes()}</div>
      </div>
    )
  }
}

export default BaseInfo
