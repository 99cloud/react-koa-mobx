import React from 'react'
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import Base from 'core/containers/List'
import WelcomeStore from 'stores/welcome'
import FormModal from 'components/Modals/Form'
import DemoForm from 'components/Forms/Demo'

import FORM_STEPS from 'configs/steps/welcome'
import FORM_TEMPLATES from 'utils/form.templates'

@inject('rootStore')
@observer
class Welcome extends Base {
  init() {
    this.store = new WelcomeStore()
  }

  // get itemActions() {
  //   return []
  // }

  // get enabledActions() {
  //   const Actions = ['edit', 'delete']
  //   return Actions
  // }

  get module() {
    return 'welcome'
  }

  get name() {
    return 'welcome'
  }

  get steps() {
    return FORM_STEPS
  }

  get form() {
    return <DemoForm />
  }

  get formTemplate() {
    return FORM_TEMPLATES[this.module]()
  }

  get dropdowns() {
    const dropdowns = ['name', 'description']

    return dropdowns
  }

  getColumns = () => [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Link to={`${this.prefix}/${record.id}`}>{text}</Link>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Note',
      dataIndex: 'note',
      key: 'note',
    },
    {
      title: 'Action',
      key: 'action',
      render: this.renderMore,
    },
  ]

  renderExtraModals() {
    const { createModal, editModal, selectItem = {} } = this.state

    const { isSubmitting } = this.store
    const detail = {
      'metadata.name': selectItem.name,
      ...selectItem,
    }

    return (
      <div>
        <FormModal
          visible={createModal}
          name={this.name}
          module={this.module}
          steps={this.steps}
          // formItem={this.form}
          formTemplate={this.formTemplate}
          isSubmitting={isSubmitting}
          onOk={this.handleCreate}
          onCancel={this.hideModal('createModal')}
          // withCode={true}
          // onlyCode={true}
        />
        <FormModal
          visible={editModal}
          name={this.name}
          module={this.module}
          steps={this.steps}
          detail={detail}
          formTemplate={this.formTemplate}
          isSubmitting={isSubmitting}
          onOk={this.handleEdit}
          onCancel={this.hideModal('editModal')}
        />
      </div>
    )
  }
}

export default Welcome
