/*
 * Created: Mon Apr 27 2020
 * Author: Apple
 */

import React from 'react'
import PropTypes from 'prop-types'
import shortid from 'shortid'
import styles from './index.scss'

const DropDowns = ({ dropDowns, onClick, showDropDown }) => {
  if (!showDropDown) {
    return null
  }

  return (
    <div className={styles.options}>
      <ul>
        {dropDowns.map(item => (
          <li
            key={shortid.generate()}
            onMouseDown={e => {
              onClick(e, item)
            }}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

DropDowns.propTypes = {
  dropDowns: PropTypes.array,
  onClick: PropTypes.func,
  showDropDown: PropTypes.bool,
}

export default DropDowns
