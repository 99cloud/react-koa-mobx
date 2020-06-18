/*
 * Created: Wed May 06 2020
 * Author: Apple
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { action, observable, computed } from 'mobx'
import { observer } from 'mobx-react'
import { get, omit, isEmpty } from 'lodash'

import Icon from 'components/Icon'

import styles from './index.scss'

@observer
export default class SearchBar extends React.Component {
  static propType = {
    onChange: PropTypes.func,
    dropDowns: PropTypes.object.isRequired,
    enableClear: PropTypes.bool,
  }

  static defaultProps = {
    enableClear: true,
    onChange() {},
  }

  @observable
  searchWord = ''

  @observable
  showDropDown = false

  @observable
  nextParamsKey = ''

  @observable
  params = {
    query: [],
  }

  @computed
  get currentParamText() {
    const { dropDowns } = this.props

    return get(dropDowns, `${this.nextParamsKey}.text`)
  }

  inputRef = React.createRef()

  @action
  removeParam = event => {
    const { onChange } = this.props
    const params = this.params
    const key = get(event, 'currentTarget.dataset.key')
    const currentParams = params.query.filter(param => param.key !== key)
    params.query = currentParams
    onChange(params.query)
  }

  @action
  changeSearchWord = event => {
    const searchWord = event.target.value

    this.showDropDown = !this.nextParamsKey || !searchWord
    this.searchWord = searchWord
  }

  @action
  handlerInputEnter = event => {
    if (event.keyCode !== 13) {
      return
    }
    const { dropDowns, onChange } = this.props

    if (!this.searchWord.trim()) {
      return
    }
    if (this.nextParamsKey) {
      this.params.query.push({
        key: this.nextParamsKey,
        value: this.searchWord,
      })
    } else {
      this.params.query.push({
        key: Object.keys(dropDowns)[0],
        value: this.searchWord,
      })
    }

    this.searchWord = ''
    this.showDropDown = true
    this.nextParamsKey = ''

    this.focus()
    onChange(this.params.query)
  }

  @action
  handleBlur = () => {
    this.showDropDown = false
  }

  @action
  handleSelectDropDown = event => {
    event.preventDefault()
    const query = get(event, 'currentTarget.dataset.query')

    this.nextParamsKey = query
    this.focus()
  }

  focus = () => {
    this.inputRef.current.focus()
  }

  renderParamsTags() {
    const { dropDowns } = this.props
    const params = this.params
    return params.query.map(({ key, value }, index) =>
      key ? (
        <span className={styles.param} key={index}>
          <span>
            {get(dropDowns, `${key}.text`)}: {value}
          </span>
          <span data-key={key} onClick={this.removeParam}>
            <Icon name="iconclose" className={styles.removeParam} />
          </span>
        </span>
      ) : null
    )
  }

  renderFilterKey() {
    return this.currentParamText ? (
      <span className={styles.currentParam}>{this.currentParamText}:</span>
    ) : null
  }

  renderInput() {
    return (
      <div className={styles.input}>
        {this.renderFilterKey()}
        <input
          type="text"
          placeholder={t('Please enter a filter')}
          value={this.searchWord}
          ref={this.inputRef}
          onChange={this.changeSearchWord}
          onFocus={this.changeSearchWord}
          onBlur={this.handleBlur}
          onKeyUp={this.handlerInputEnter}
        />
        {this.showDropDown && this.renderDropdownContent()}
      </div>
    )
  }

  renderDropdownContent() {
    const selectedParams = this.params.query.map(param => param.key)
    const filteredDropDowns = omit(this.props.dropDowns, selectedParams)

    if (isEmpty(filteredDropDowns)) {
      return null
    }

    return (
      <div className={styles.dropdown}>
        {Object.entries(filteredDropDowns).map(([query, options]) => (
          <div
            className={styles.dropdownItem}
            key={query}
            onMouseDown={this.handleSelectDropDown}
            data-query={query}
          >
            {options.icon && (
              <span className={styles.icon}>
                <Icon name={options.icon} size={20} />
              </span>
            )}
            <span>{options.text}</span>
          </div>
        ))}
      </div>
    )
  }

  renderClear() {
    return (
      <span className={styles.icon}>
        <Icon name="iconclose" size={20} />
      </span>
    )
  }

  render() {
    const { enableClear, className } = this.props
    return (
      <div
        className={classnames(styles.container, className)}
        onClick={this.focus}
      >
        {this.renderParamsTags()}
        {this.renderInput()}
        {enableClear && this.renderClear()}
      </div>
    )
  }
}
