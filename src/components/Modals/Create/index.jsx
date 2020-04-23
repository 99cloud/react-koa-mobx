/*
 * Created: Tue Apr 21 2020
 * Author: Apple
 */

import { cloneDeep } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Switch } from 'antd'
import Form from '../Form/Form'
import Code from '../Form/Code'

import styles from './index.scss'

export default class CreateModal extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    name: PropTypes.string,
    module: PropTypes.string,
    steps: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
    store: PropTypes.object,
    formTemplate: PropTypes.object,
    visible: PropTypes.bool,
    okBtnText: PropTypes.string,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    isSubmitting: PropTypes.bool,
  }

  static defaultProps = {
    visible: false,
    isSubmitting: false,
    onOk() {},
    onCancel() {},
  }

  constructor(props) {
    super(props)

    this.state = {
      formTemplate: cloneDeep(props.formTemplate),
      isCodeMode: props.onlyCode || false,
    }

    this.codeRef = React.createRef()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible !== this.props.visible) {
      if (nextProps.visible) {
        this.setState({
          isCodeMode: nextProps.onlyCode || false,
          formTemplate: cloneDeep(this.props.formTemplate),
        })
      }
    }
  }

  handleModeChange = () => {
    this.setState(({ isCodeMode, formTemplate }) => {
      const newState = { formTemplate, isCodeMode: !isCodeMode }

      return newState
    })
  }

  renderForms() {
    const {
      module,
      onOk,
      onCancel,
      okBtnText,
      steps,
      isSubmitting,
      detail = {},
      visible,
    } = this.props
    const { formTemplate } = this.state

    return (
      <Form
        formTemplate={formTemplate}
        module={module}
        steps={steps}
        onOk={onOk}
        onCancel={onCancel}
        okBtnText={okBtnText}
        isSubmitting={isSubmitting}
        detail={detail}
        visible={visible}
      />
    )
  }

  renderCodeEditor() {
    const { onOk, onCancel, isSubmitting } = this.props
    const { formTemplate } = this.state

    return (
      <Code
        ref={this.codeRef}
        formTemplate={formTemplate}
        onOk={onOk}
        onCancel={onCancel}
        isSubmitting={isSubmitting}
      />
    )
  }

  renderTitles() {
    const { withCode, onlyCode } = this.props

    const { name } = this.props
    const title = this.props.title || `${t('Create')} ${t(name)}`

    const renderSwitch = () => {
      if (!withCode || onlyCode) {
        return null
      }

      return (
        <Switch
          className={styles.switch}
          checkedChildren={t('Edit Mode')}
          unCheckedChildren={t('Edit Mode')}
          onChange={this.handleModeChange}
          defaultChecked
        />
      )
    }

    return (
      <>
        <span>{title}</span>
        {renderSwitch()}
      </>
    )
  }

  render() {
    const { width, visible, onCancel, ...rest } = this.props
    const { isCodeMode } = this.state

    return (
      <Modal
        width={width || 960}
        title={this.renderTitles()}
        wrapClassName={styles.body}
        onCancel={onCancel}
        visible={visible}
        {...rest}
        footer={null}
      >
        {isCodeMode ? this.renderCodeEditor() : this.renderForms()}
      </Modal>
    )
  }
}
