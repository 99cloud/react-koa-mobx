/*
 * Created: Tue Apr 21 2020
 * Author: Apple
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { toJS } from 'mobx'
import { isEmpty } from 'lodash'
import { SearchOutlined } from '@ant-design/icons'
import { Table, Button, Row, Col, Input } from 'antd'
import SearchBar from '../SearchBar'

import styles from './index.scss'

export default class BaseTable extends React.Component {
  static propTypes = {
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    columns: PropTypes.array.isRequired,
    selectedRowKeys: PropTypes.array,
    isLoading: PropTypes.bool,
    pagination: PropTypes.object,
    filters: PropTypes.object,
    keyword: PropTypes.string,
    rowKey: PropTypes.any,
    onFetch: PropTypes.func,
    onSelectRowKeys: PropTypes.func,
    getCheckboxProps: PropTypes.func,
    onDelete: PropTypes.func,
    onCreate: PropTypes.func,
    hideHeader: PropTypes.bool,
    hideSearch: PropTypes.bool,
    actions: PropTypes.array,
    selectActions: PropTypes.array,
    extraProps: PropTypes.object,
    dropDowns: PropTypes.object,
  }

  static defaultProps = {
    rowKey: 'name',
    selectedRowKeys: [],
    onFetch() {},
    hideHeader: false,
    hideSearch: false,
    extraProps: {},
  }

  handlePagination = page => {
    const { onPaging, onFetch } = this.props
    const params = { current: page }
    if (onPaging) {
      return onPaging(params)
    }

    onFetch(params)
  }

  handleSizeChange = (current, pageSize) => {
    const { onFetch } = this.props

    const params = { current, pageSize }

    onFetch(params)
  }

  handleCancelSelect = () => {
    this.props.onSelectRowKeys([])
  }

  handleSearch = e => {
    const content = e.target.value
    const params = {
      name: content,
    }
    this.props.fetchList(params)
  }

  handleFilterInput = params => {
    const filters = {}
    params.forEach(n => {
      filters[n.key] = n.value
    })

    this.props.fetchList(filters)
  }

  renderSearch() {
    const { hideSearch, dropDowns } = this.props

    const params = {
      query: [],
    }

    if (hideSearch) {
      return null
    }

    if (!isEmpty(dropDowns)) {
      return (
        <SearchBar
          params={params}
          dropDowns={dropDowns}
          onChange={this.handleFilterInput}
        />
      )
    }

    const placeholder =
      this.props.placeholder || t('Please input a keyword to find')
    return (
      <Input
        prefix={<SearchOutlined />}
        placeholder={placeholder}
        className={styles.keyword}
        onPressEnter={this.handleSearch}
      />
    )
  }

  renderActions() {
    const { onCreate, actions } = this.props

    if (actions) {
      return actions.map(action => (
        <Button
          key={action.key}
          type={action.type}
          className={styles.create}
          onClick={action.onClick}
          data-test={`table-${action.key}`}
        >
          {action.text}
        </Button>
      ))
    }

    if (!onCreate) {
      return null
    }

    return (
      <Button type="primary" onClick={onCreate} data-test="table-create">
        {t('Create')}
      </Button>
    )
  }

  renderNormalTitle() {
    return (
      <Row className={styles.title}>
        <Col span={18}>{this.renderSearch()}</Col>
        <Col className={styles.actions} span={6}>
          {this.renderActions()}
        </Col>
      </Row>
    )
  }

  renderSelectActions() {
    const { onDelete } = this.props

    return (
      <>
        {onDelete && (
          <Button
            type="danger"
            className={styles.button}
            onClick={onDelete}
            data-test="table-delete"
          >
            {t('Delete')}
          </Button>
        )}
      </>
    )
  }

  renderSelectedTitle = () => (
    <Row className={classnames(styles.selected, styles.title)}>
      <Col span={18}>{this.renderSelectActions()}</Col>
      <Col className={styles.actions} span={6}>
        <Button
          type="flat"
          className={styles.cancelSelect}
          onClick={this.handleCancelSelect}
          data-test="table-cancel-select"
        >
          {t('Cancel Select')}
        </Button>
      </Col>
    </Row>
  )

  renderTableTitle = () => {
    if (this.props.selectedRowKeys && this.props.selectedRowKeys.length > 0) {
      return this.renderSelectedTitle()
    }

    return this.renderNormalTitle()
  }

  render() {
    const {
      className,
      data,
      columns,
      isLoading,
      rowKey,
      selectedRowKeys,
      onSelectRowKeys,
      extraProps,
      getCheckboxProps,
      pagination,
      hideHeader,
    } = this.props
    const { total, current, pageSize } = pagination
    const props = {}

    return (
      <>
        {!hideHeader && this.renderTableTitle()}
        <Table
          size="middle"
          className={className}
          rowKey={rowKey}
          columns={columns}
          dataSource={toJS(data)}
          loading={isLoading}
          rowSelection={{
            selectedRowKeys,
            getCheckboxProps,
            onSelect: (record, checked, selectedRows) => {
              onSelectRowKeys(selectedRows.map(row => row[rowKey]))
            },
            onSelectAll: (checked, selectedRows) => {
              onSelectRowKeys(selectedRows.map(row => row[rowKey]))
            },
          }}
          pagination={{
            current,
            total,
            pageSize,
            showTotal: v => t('TOTAL_ITEMS', { num: v }),
            onChange: this.handlePagination,
            showSizeChanger: true,
            onShowSizeChange: this.handleSizeChange,
            size: 'small',
            locale: { items_per_page: '' },
          }}
          {...props}
          {...extraProps}
        />
      </>
    )
  }
}
