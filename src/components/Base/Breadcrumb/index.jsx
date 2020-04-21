/*

 */

import { isEmpty } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import isEqual from 'react-fast-compare'
import pathToRegexp from 'path-to-regexp'
import { ReactComponent as BackIcon } from 'src/assets/back.svg'

import styles from './index.scss'

export default class Breadcrumb extends React.Component {
  static propTypes = {
    breadcrumbs: PropTypes.array,
    routes: PropTypes.array,
    params: PropTypes.object,
    pathname: PropTypes.string,
    goBack: PropTypes.func,
  }

  static defaultProps = {
    breadcrumbs: [],
    routes: [],
    params: {},
    pathname: '',
    goBack() {},
  }

  shouldComponentUpdate(nextProps) {
    return (
      !isEqual(nextProps.breadcrumbs, this.props.breadcrumbs) ||
      !isEqual(nextProps.routes, this.props.routes) ||
      !isEqual(nextProps.params, this.props.params) ||
      nextProps.pathname !== this.props.pathname
    )
  }

  getCurrentPath() {
    const { pathname, routes } = this.props

    return routes
      .filter(item => item.name)
      .find(item => !isEmpty(pathToRegexp(item.path).exec(pathname)))
  }

  compile = value => {
    const { params } = this.props
    return pathToRegexp.compile(value)(params)
  }

  render() {
    const { breadcrumbs } = this.props

    const links = []
    breadcrumbs.forEach((item, index) => {
      const label = this.compile(item.label)

      if (index === 0) {
        return links.push(
          <Link key={index} to={this.compile(item.url)}>
            {t(label)}
          </Link>
        )
      }

      return links.push(
        <span key={`split-${index}`} className={styles.split}>
          /
        </span>,
        <Link key={index} to={this.compile(item.url)}>
          {t(label)}
        </Link>
      )
    })

    const currentPath = this.getCurrentPath()
    if (currentPath) {
      const index = links.length
      if (links.length > 0) {
        links.push(
          <span key={`split-${index}`} className={styles.split}>
            /
          </span>
        )
      }
      links.push(
        <span key={index} className={styles.current}>
          {t(currentPath.title)}
        </span>
      )
    }

    return (
      <div className={styles.breadcrumb}>
        <a
          className={classNames('custom-icon', styles.back)}
          onClick={this.props.goBack}
        >
          <BackIcon />
        </a>
        {links}
      </div>
    )
  }
}
