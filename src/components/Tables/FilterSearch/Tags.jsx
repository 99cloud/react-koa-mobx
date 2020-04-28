/*
 * Created: Mon Apr 27 2020
 * Author: Apple
 */

import React from 'react'
import { Tag } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import styles from './index.scss'

const Tags = ({ tags, onClose }) => (
  <>
    <SearchOutlined className={styles['search-icon']} />
    {tags.map((tag, index) => (
      <Tag
        className={styles.tag}
        key={index}
        closable={true}
        onClose={() => onClose(tag)}
      >
        {tag.label === 'keyword' ? tag.value : `${tag.label}:${tag.value}`}
      </Tag>
    ))}
  </>
)

Tags.propTypes = {
  tags: PropTypes.array,
  onClose: PropTypes.func,
}

export default Tags
