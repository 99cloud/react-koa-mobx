import React from 'react'
import { computed } from 'mobx'
import classnames from 'classnames'
import { getDisplayName, getLocalTime } from 'utils'

import BaseInfo from 'core/containers/Detail/BaseInfo'

import styles from './index.scss'

export default class DetailBase extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      notFound: false,
    }

    this.init()
  }

  get params() {
    // fix:
    // return this.props.match.params || {}
    return { id: 'test' }
  }

  get name() {
    return ''
  }

  get module() {
    return this.props.module
  }

  get authKey() {
    return this.module
  }

  get routing() {
    return this.props.rootStore.routing
  }

  get isLoading() {
    return this.store.isLoading
  }

  @computed
  get detailName() {
    return getDisplayName(this.store.detail)
  }

  @computed
  get createTime() {
    return getLocalTime(this.store.detail.createTime).format(
      'YYYY-MM-DD HH:mm:ss'
    )
  }

  init() {
    this.store = {
      detail: {},
      isLoading: true,
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  catch = e => {
    if (
      e.code === 404 ||
      e.status === 404 ||
      e.reason === 'NotFound' ||
      e.reason === 'Not Found'
    ) {
      this.setState({ notFound: true })
    }
  }

  fetchData = () => {
    if (this.store.fetchDetail) {
      this.store.fetchDetail(this.params).catch(this.catch)
    }
  }

  getAttrs = () => []

  renderSider() {
    return <BaseInfo name={this.detailName} attrs={this.getAttrs()} />
  }

  renderNav() {
    return null
  }

  renderSubView() {
    return null
  }

  renderModals() {
    return null
  }

  render() {
    return (
      <div className={classnames(styles.main, this.className)}>
        <div className={styles.sider}>{this.renderSider()}</div>
        <div className={styles.content}>
          content
          {this.renderNav()}
          <div className={styles.view}>{this.renderSubView()}</div>
          {this.renderModals()}
        </div>
      </div>
    )
  }
}
