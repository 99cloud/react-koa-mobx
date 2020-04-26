/*
 * Created: Tue Apr 21 2020
 * Author: Apple
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, Input } from 'antd'

import styles from './index.scss'

export default class DeleteModal extends React.Component {
  static propTypes = {
    type: PropTypes.string,
    resource: PropTypes.string,
    visible: PropTypes.bool,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    desc: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
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

  state = {
    confirm: '',
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible) {
      this.setState({ confirm: '' })
    }
  }

  handleInputChange = e => {
    this.setState({ confirm: e.target.value })
  }

  handleOk = () => {
    this.props.onOk()
  }

  render() {
    const {
      app,
      type,
      resource,
      visible,
      onCancel,
      title,
      desc,
      isSubmitting,
    } = this.props

    let tip =
      desc ||
      (resource && type
        ? t.html('DELETE_CONFIRM_TIP', { type, resource })
        : t('DELETE_TIP', { type, resource }))

    if (app) {
      tip = t('DELETE_APP_RESOURCE_TIP', { type, resource, app })
    }

    return (
      <Modal
        width={504}
        bodyStyle={{ padding: 0 }}
        wrapClassName={styles.modalBody}
        visible={visible}
        // isSubmitting={isSubmitting}
        closable={false}
        footer={null}
      >
        <div className={styles.body}>
          <div className="h5">{title || t('DELETE_TITLE', { type })}</div>
          <div className={styles.content}>
            <p>{tip}</p>
            {resource && (
              <Input
                name="confirm"
                value={this.state.confirm}
                onChange={this.handleInputChange}
                placeholder={t('DELETE_CONFIRM_PLACEHOLDER', { resource })}
                autoFocus={true}
              />
            )}
          </div>
        </div>
        <div className={styles.footer}>
          <Button onClick={onCancel} data-test="modal-cancel">
            {t('Cancel')}
          </Button>
          <Button
            type="danger"
            loading={isSubmitting}
            disabled={
              isSubmitting ||
              (resource ? this.state.confirm !== resource : false)
            }
            onClick={this.handleOk}
            data-test="modal-ok"
          >
            {t('OK')}
          </Button>
        </div>
      </Modal>
    )
  }
}
