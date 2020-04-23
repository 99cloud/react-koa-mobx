/*
 * Created: Tue Apr 21 2020
 * Author: Apple
 */

import { cloneDeep } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'antd'
import Form from '../Form/Form'

import styles from './index.scss'

export default class CreateModal extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    name: PropTypes.string,
    module: PropTypes.string,
    steps: PropTypes.any,
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
    }

    this.codeRef = React.createRef()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible !== this.props.visible) {
      if (nextProps.visible) {
        this.setState({
          formTemplate: cloneDeep(this.props.formTemplate),
        })
      }
    }
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

  renderTitles() {
    const { name } = this.props
    const title = this.props.title || `${t('Edit')} ${t(name)}`

    return <span>{title}</span>
  }

  render() {
    const { width, visible, onCancel, ...rest } = this.props

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
        {this.renderForms()}
      </Modal>
    )
  }
}
