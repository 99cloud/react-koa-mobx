/*
 * Created: Fri Apr 24 2020
 * Author: Apple
 */

import React from 'react'
import classnames from 'classnames'
import { parse } from 'qs'
import { toJS } from 'mobx'
import { cacheFunc } from 'utils'
import { isEmpty, isFunction } from 'lodash'
import BaseTable from 'components/Tables/Base'
import { PageHeader, Dropdown, Menu } from 'antd'
import { MoreOutlined } from '@ant-design/icons'
import Icon from 'components/Icon'
import Notify from 'components/Notify'
import DeleteModal from 'components/Modals/Delete'

import styles from './index.scss'

export default class BaseList extends React.Component {
  constructor(props, options = {}) {
    super(props)

    this.options = options

    this.state = {}

    this.init()
  }

  init() {
    this.store = {}
  }

  componentDidMount() {
    this.unsubscribe = this.routing.history.subscribe(location => {
      if (location.pathname === this.props.match.url) {
        const params = parse(location.search.slice(1))
        this.getData(params)
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe()
  }

  get module() {
    return ''
  }

  get authKey() {
    return this.module
  }

  get name() {
    return ''
  }

  get list() {
    return this.store.list
  }

  get prefix() {
    return this.props.match.url
  }

  get routing() {
    return this.props.rootStore.routing
  }

  get className() {
    return ''
  }

  get rowKey() {
    return 'id'
  }

  get itemActions() {
    return [
      {
        key: 'edit',
        icon: 'iconedit',
        text: t('Edit'),
        action: 'edit',
        onClick: this.showModal('editModal'),
      },
      {
        key: 'delete',
        icon: 'icontrash',
        text: t('Delete'),
        action: 'delete',
        onClick: this.showModal('deleteModal'),
      },
    ]
  }

  get enabledActions() {
    // todo: enable add action authority
    const Actions = ['edit', 'delete']
    return Actions
  }

  get dropdowns() {
    return []
  }

  get enabledItemActions() {
    return this.itemActions.filter(
      item => !item.action || this.enabledActions.includes(item.action)
    )
  }

  async getData({ ...params } = {}) {
    await this.store.fetchList({ ...this.props.match.params, ...params })
  }

  getColumns = () => []

  getDropDowns = () => {
    const dropDowns = {}

    this.getColumns()
      .filter(column => column.search)
      .forEach(item => {
        dropDowns[item.key] = {
          text: item.title,
          icon: item.icon,
        }
      })
    return dropDowns
  }

  getTableProps() {
    return {
      onFetch: this.handleFetch,
      onSelectRowKeys: this.handleSelectRowKeys,
      onCreate: this.showModal('createModal'),
      onDelete: this.showModal('batchDeleteModal'),
    }
  }

  getEnabledTableProps() {
    const props = this.getTableProps()

    return props
  }

  showModal = type =>
    cacheFunc(
      `_showModal_${type}`,
      () => {
        this.setState({ [type]: true })
      },
      this
    )

  hideModal = type =>
    cacheFunc(
      `_hideModal_${type}`,
      () => {
        this.setState({ [type]: false, selectItem: {} })
      },
      this
    )

  handleSelectRowKeys = params => {
    this.store.setSelectRowKeys(params)
  }

  handleFetch = (params, refresh) => {
    this.routing.query(params, refresh)
  }

  handleMoreMenuClick = item => ({ key }) => {
    const action = this.enabledItemActions.find(_action => _action.key === key)

    if (action && action.onClick) {
      action.onClick(item)
    }

    this.setState({ selectItem: item })
  }

  handleDelete = () => {
    const { selectItem } = this.state

    this.store.delete(selectItem, this.props.match.params).then(() => {
      this.hideModal('deleteModal')()
      Notify.success({ message: `${t('Deleted Successfully')}!` })
      this.routing.query()
    })
  }

  handleBatchDelete = () => {
    const { selectedRowKeys } = this.list

    if (selectedRowKeys.length > 0) {
      this.store
        .batchDelete(selectedRowKeys, this.props.match.params)
        .then(() => {
          this.hideModal('batchDeleteModal')()
          Notify.success({ message: `${t('Deleted Successfully')}!` })
          this.store.setSelectRowKeys([])
          this.routing.query()
        })
    }
  }

  handleCreate = newObject => {
    const data = newObject

    if (!data) {
      return
    }
    // eslint-disable-next-line no-console
    console.log('handleCreate', data)

    // const kind = MODULE_KIND_MAP[this.module]

    // if (kind) {
    //   if (Object.keys(newObject).length === 1 && newObject[kind]) {
    //     data = newObject[kind]
    //   }
    // }

    // this.store.create(data, this.props.match.params).then(() => {
    //   this.hideModal('createModal')()
    //   Notify.success({ content: `${t('Created Successfully')}!` })
    //   this.getData({ silent: true })
    //   formPersist.delete(`${this.module}_create_form`)
    // })
  }

  handleEdit = newObject => {
    // eslint-disable-next-line no-console
    console.log('handleEdit', newObject)
    // const { selectItem } = this.state

    // this.store.patch(selectItem, newObject).then(() => {
    //   this.hideModal('editModal')()
    //   Notify.success({ content: `${t('Updated Successfully')}!` })
    //   this.routing.query()
    // })
  }

  renderEmpty() {
    // todo:
    return <div>{t('No Data')}</div>
  }

  renderHeader() {
    const routes = [
      {
        path: 'index',
        breadcrumbName: 'First-level Menu',
      },
      {
        path: 'first',
        breadcrumbName: 'Second-level Menu',
      },
      {
        path: 'second',
        breadcrumbName: 'Third-level Menu',
      },
    ]
    return (
      <PageHeader
        className="site-page-header"
        title="Title"
        breadcrumb={{ routes }}
        subTitle="This is a subtitle"
      />
    )
  }

  renderModals() {
    const { deleteModal, batchDeleteModal, selectItem = {} } = this.state
    const { isSubmitting } = this.store
    return (
      <div>
        <DeleteModal
          type={t(this.name)}
          resource={selectItem[this.rowKey]}
          visible={deleteModal}
          onOk={this.handleDelete}
          onCancel={this.hideModal('deleteModal')}
          isSubmitting={isSubmitting}
        />
        {this.list.selectedRowKeys && (
          <DeleteModal
            type={t(this.name)}
            resource={this.list.selectedRowKeys.join(', ')}
            visible={batchDeleteModal}
            onOk={this.handleBatchDelete}
            onCancel={this.hideModal('batchDeleteModal')}
            isSubmitting={isSubmitting}
          />
        )}
        {this.renderExtraModals()}
      </div>
    )
  }

  renderExtraModals() {
    return null
  }

  renderMore = (field, record) => {
    if (isEmpty(this.enabledItemActions)) {
      return null
    }

    const overlay = this.renderMoreMenu(record)

    if (overlay === null) {
      return null
    }

    return (
      <Dropdown overlay={overlay} trigger="hover" placement="bottomRight">
        <MoreOutlined className="more" />
      </Dropdown>
    )
  }

  renderMoreMenu = record => {
    const items = this.enabledItemActions.map(action => {
      const show = isFunction(action.show)
        ? action.show(record)
        : action.show || true
      if (!show) return null

      return (
        <Menu.Item
          className={
            (styles['menu-items'], { [styles.danger]: action.key === 'delete' })
          }
          key={action.key}
        >
          <Icon name={action.icon} />
          <span className={styles.text} data-test={`table-item-${action.key}`}>
            {action.text}
          </span>
        </Menu.Item>
      )
    })

    if (items.every(item => item === null)) {
      return null
    }

    return (
      <Menu className={styles.menu} onClick={this.handleMoreMenuClick(record)}>
        {items}
      </Menu>
    )
  }

  renderTable() {
    const {
      data,
      current,
      pageSize,
      total,
      isLoading,
      selectedRowKeys,
      keyword,
      filters = {},
    } = this.list

    const pagination = { current, pageSize, total }

    return (
      <BaseTable
        columns={this.getColumns()}
        rowKey={this.rowKey}
        dropDowns={this.getDropDowns()}
        selectedRowKeys={toJS(selectedRowKeys)}
        {...{ data, filters, keyword, pagination, isLoading }}
        {...this.getEnabledTableProps()}
      />
    )
  }

  render() {
    return (
      <div className={classnames(styles.wrapper, this.className)}>
        {/* {this.renderHeader()} */}
        {this.renderTable()}
        {this.renderModals()}
      </div>
    )
  }
}
