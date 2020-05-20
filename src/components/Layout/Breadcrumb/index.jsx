/*
 * Created: Fri May 15 2020
 * Author: Apple
 */

import React from 'react'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'
import { matchRoutes } from 'react-router-config'

export default ({ location, routes }) => {
  const pathSnippets = location.pathname.split('/').filter(i => i)

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`

    const matchedRoutes = matchRoutes(routes, url)

    if (matchedRoutes.length === 0) {
      return null
    }

    const { route } = matchedRoutes[0]

    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{route.breadcrumbName}</Link>
      </Breadcrumb.Item>
    )
  })

  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">{t('Home')}</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems)

  return <Breadcrumb>{breadcrumbItems}</Breadcrumb>
}
