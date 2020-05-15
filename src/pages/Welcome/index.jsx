/*
 * Created: Tue Apr 21 2020
 * Author: Apple
 */

import React from 'react'
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import Base from 'core/containers/List'
import WelcomeStore from 'stores/welcome'
import CreateModal from 'components/Modals/Create'
import EditModal from 'components/Modals/Edit'
import FORM_STEPS from 'configs/steps/welcome'
import FORM_TEMPLATES from 'utils/form.templates'

@inject('rootStore')
@observer
class Welcome extends Base {
  init() {
    this.store = new WelcomeStore()
  }

  get module() {
    return 'welcome'
  }

  get name() {
    return 'welcome'
  }

  get steps() {
    return FORM_STEPS
  }

  get formTemplate() {
    return FORM_TEMPLATES[this.module]()
  }

  getColumns = () => [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Link to={`${this.prefix}/${record.id}`}>{text}</Link>
      ),
      search: true,
      icon: 'iconsmile',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      search: true,
      icon: 'iconsmile',
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
        <CreateModal
          visible={createModal}
          name={this.name}
          module={this.module}
          steps={this.steps}
          formTemplate={this.formTemplate}
          isSubmitting={isSubmitting}
          onOk={this.handleCreate}
          onCancel={this.hideModal('createModal')}
          // withCode={true}
          // onlyCode={true}
        />
        <EditModal
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
