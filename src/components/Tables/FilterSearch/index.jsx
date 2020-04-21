import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { SearchOutlined } from '@ant-design/icons'
import { Input, Tag } from 'antd'
import Icon from 'components/Icon'
import shortid from 'shortid'

import styles from './index.scss'

class FilterSearch extends React.Component {
  static propTypes = {
    dropDowns: PropTypes.array,
  }

  static defaultProps = {
    dropDowns: [],
  }

  constructor(props) {
    super(props)

    this.state = {
      tags: [],
      inputValue: '',
      showOptions: false,
      selectedKey: 'keyword',
    }
  }

  saveInputRef = React.createRef()

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value })
  }

  handleFocus = () => {
    if (!this.state.inputValue) {
      this.setState({
        selectedKey: 'keyword',
        showOptions: true,
      })
    }
  }

  handleInputConfirm = () => {
    setTimeout(() => {
      const { selectedKey, inputValue } = this.state
      let { tags } = this.state
      if (inputValue) {
        const filter = {
          label: selectedKey,
          value: inputValue.replace(`${selectedKey}:`, ''),
        }
        if (
          tags.some(tag => tag.label === 'keyword') &&
          selectedKey === 'keyword'
        ) {
          tags = [...tags.filter(tag => tag.label !== 'keyword'), filter]
        } else {
          tags = [...tags, filter]
        }
      }
      this.setState({
        tags,
        selectedKey: 'keyword',
        inputValue: '',
        showOptions: false,
      })
    }, 100)
  }

  handleDeleteTag = e => {
    if (!this.state.inputValue && e.keyCode === 8) {
      const newTags = this.state.tags
      newTags.pop()

      this.setState({
        tags: newTags,
        showOptions: false,
      })
    }
  }

  handleClose = removedTag => {
    const tags = this.state.tags.filter(tag => tag.value !== removedTag)

    this.setState({ tags, showOptions: false })
  }

  handleClear = () => {
    this.setState({
      tags: [],
      showOptions: false,
      inputValue: '',
    })
  }

  handleSelect = (e, item) => {
    const { value } = item
    this.setState(
      {
        selectedKey: value,
        inputValue: `${value}:`,
        showOptions: false,
      },
      () => this.saveInputRef.current.focus()
    )
  }

  renderOptions() {
    const { dropDowns } = this.props
    if (!this.state.showOptions) {
      return null
    }

    return (
      <div className={styles.options}>
        <ul>
          {dropDowns.map(item => (
            <li
              key={shortid.generate()}
              onClick={e => {
                this.handleSelect(e, item)
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderClear() {
    if (!this.state.inputValue && this.state.tags.length === 0) {
      return null
    }

    return (
      <span className={styles.close} onClick={this.handleClear}>
        <Icon name="iconclose" />
      </span>
    )
  }

  render() {
    const { tags, inputValue } = this.state

    return (
      <div className={styles.search}>
        {this.renderOptions()}
        <SearchOutlined className={styles['search-icon']} />
        {tags.map((tag, index) => (
          <Tag
            className={styles.tag}
            key={index}
            closable={true}
            onClose={() => this.handleClose(tag.value)}
          >
            {tag.label === 'keyword' ? tag.value : `${tag.label}:${tag.value}`}
          </Tag>
        ))}
        <span className={styles.input}>
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            className={styles['tag-input']}
            value={inputValue}
            onChange={this.handleInputChange}
            onFocus={this.handleFocus}
            // onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
            onKeyDown={this.handleDeleteTag}
          />
        </span>
        {this.renderClear()}
      </div>
    )
  }
}

export default FilterSearch
