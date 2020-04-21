import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'
import EditMode from 'components/Code/EditMode'

import styles from './index.scss'

export default class CodeMode extends React.Component {
  static propTypes = {
    formTemplate: PropTypes.object,
    onOk: PropTypes.func,
    isSubmitting: PropTypes.bool,
  }

  static defaultProps = {
    onOk() {},
    isSubmitting: false,
  }

  constructor(props) {
    super(props)

    this.editor = React.createRef()
  }

  getData() {
    return this.editor.current.getData()
  }

  handleCreate = () => {
    const { onOk } = this.props

    onOk(this.getData())
  }

  render() {
    const { formTemplate, onCancel, isSubmitting } = this.props
    return (
      <div>
        <div className={styles.wrapper}>
          <EditMode ref={this.editor} value={formTemplate} />
        </div>
        <div className={styles.footer}>
          <Button onClick={onCancel}>{t('Cancel')}</Button>
          <Button
            type="primary"
            onClick={this.handleCreate}
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            {t('Create')}
          </Button>
        </div>
      </div>
    )
  }
}
