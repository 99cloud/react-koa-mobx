/*
 * Created: Tue Apr 21 2020
 * Author: Apple
 * iconclose、iconquestion、icondownload、iconupload、iconedit、icontrash、iconsmile、
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const Icon = props => {
  const { name, className, style, size } = props
  const styles = { fontSize: size, ...style }

  return (
    <svg
      className={classnames('icon', className)}
      aria-hidden="true"
      style={styles}
    >
      <use xlinkHref={`#${name || 'iconsmile'}`} />
    </svg>
  )
}

Icon.propTypes = {
  name: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object,
}

Icon.defaultProps = {
  name: 'iconsmile',
}

export default Icon
