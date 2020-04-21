import React, { lazy, Suspense, PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { isObject } from 'lodash'
import { Spin } from 'antd'

import { getValue, getValueObj } from 'utils/yaml'

import styles from './index.scss'

const AceEditor = lazy(() =>
  import(/* webpackChunkName: "react-ace" */ './AceEditor')
)

class CodeEditor extends PureComponent {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    mode: PropTypes.string,
    options: PropTypes.object,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    value: '',
    mode: 'yaml',
    options: {},
    onChange() {},
  }

  constructor(props) {
    super(props)

    const { mode, value } = props

    this.state = {
      value: getValue(mode, value),
    }
  }

  componentWillReceiveProps(nextProps) {
    const { mode, value } = nextProps

    if (
      nextProps.mode !== this.props.mode &&
      nextProps.value !== this.props.value
    ) {
      if (isObject(value)) {
        this.setState({ value: getValue(mode, value) })
      } else {
        const newValue = getValue(mode, getValueObj(this.props.mode, value))
        this.setState({ value: newValue })
      }
    } else if (nextProps.mode !== this.props.mode) {
      const newValue = getValue(
        mode,
        getValueObj(this.props.mode, this.state.value)
      )
      this.setState({ value: newValue })
    } else if (nextProps.value !== this.props.value) {
      this.setState({ value: getValue(mode, value) })
    }
  }

  handleChange = value => {
    const { onChange } = this.props
    onChange(value)
  }

  render() {
    const { className, mode, options } = this.props
    const { value } = this.state

    return (
      <Suspense fallback={<Spin wrapperClassName="page-loading" />}>
        <AceEditor
          {...options}
          className={classnames(styles.editor, className)}
          value={value}
          mode={mode}
          onChange={this.handleChange}
        />
      </Suspense>
    )
  }
}

export default CodeEditor
