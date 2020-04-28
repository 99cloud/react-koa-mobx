/*
 * Created: Tue Apr 21 2020
 * Author: Apple
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'antd'
import Icon from 'components/Icon'
import { isEqual } from 'lodash'
import Tags from './Tags'
import DropsDowns from './DropDowns'

import styles from './index.scss'

class FilterSearch extends React.Component {
  static propTypes = {
    dropDowns: PropTypes.array,
    searchColumn: PropTypes.string,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    tags: [],
    dropDowns: [],
    searchColumn: 'keyword',
  }

  constructor(props) {
    super(props)

    this.state = {
      tags: [],
      inputValue: '',
      showDropDown: false,
      searchColumn: props.searchColumn,
      dropDowns: props.dropDowns,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { tags } = this.state
    if (!isEqual(tags, prevState.tags)) {
      this.props.onChange(tags)
    }
  }

  saveInputRef = React.createRef()

  handleChange = e => {
    this.setState({ inputValue: e.target.value })
  }

  handleFocus = () => {
    if (!this.state.inputValue) {
      this.setState({
        searchColumn: 'keyword',
        showDropDown: true,
      })
    }
  }

  handlePressEnter = () => {
    setTimeout(() => {
      const { searchColumn, inputValue } = this.state
      let { tags } = this.state
      if (inputValue) {
        const filter = {
          label: searchColumn,
          value: inputValue.replace(`${searchColumn}:`, ''),
        }

        if (
          tags.some(tag => tag.label === 'keyword') &&
          searchColumn === 'keyword'
        ) {
          tags = [...tags.filter(tag => tag.label !== 'keyword'), filter]
        } else {
          tags = [...tags, filter]
        }
      }
      this.setState({
        tags,
        searchColumn: 'keyword',
        inputValue: '',
        showDropDown: false,
      })
    }, 100)
  }

  handleDeleteTag = e => {
    // Delete tag, keyCode is equal to 8 which means deleteKey on keyboard
    if (!this.state.inputValue && e.keyCode === 8) {
      const newTags = this.state.tags
      newTags.pop()

      this.setState({
        tags: newTags,
        showDropDown: false,
      })
    }
  }

  handleClose = removedTag => {
    const tags = this.state.tags.filter(tag => tag.value !== removedTag.value)

    const removed = this.props.dropDowns.filter(
      dropDown => dropDown.value === removedTag.label
    )

    this.setState({
      tags,
      showDropDown: false,
      dropDowns: this.state.dropDowns.concat(removed),
    })
  }

  handleClear = () => {
    this.setState({
      tags: [],
      showDropDown: false,
      inputValue: '',
    })
  }

  handleSelect = (e, item) => {
    const { value } = item
    this.setState(
      {
        searchColumn: value,
        inputValue: `${value}:`,
        showDropDown: false,
        dropDowns: this.state.dropDowns.filter(
          option => option.value !== value
        ),
      },
      () => {
        this.saveInputRef.current.focus()
      }
    )
  }

  handleBlur = () => {
    this.setState(
      {
        showDropDown: false,
      },
      () => {
        this.state.searchColumn !== 'keyword' &&
          this.saveInputRef.current.focus()
      }
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
    const { tags, inputValue, dropDowns, showDropDown } = this.state

    return (
      <div className={styles.search}>
        <DropsDowns
          dropDowns={dropDowns}
          showDropDown={showDropDown}
          onClick={this.handleSelect}
        />
        <Tags tags={tags} onClose={this.handleClose} />
        <span className={styles.input}>
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            className={styles['tag-input']}
            value={inputValue}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onPressEnter={this.handlePressEnter}
            onKeyDown={this.handleDeleteTag}
          />
        </span>
        {this.renderClear()}
      </div>
    )
  }
}

export default FilterSearch
