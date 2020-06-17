/*
 * Created: Fri May 22 2020
 * Author: Apple
 */

import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
// import PropTypes from 'prop-types'
import ScrollSelect from 'components/ScrollSelect'
import HomeStore from 'stores/home'

@inject('rootStore')
@observer
class Home extends Component {
  constructor(props) {
    super(props)

    this.store = new HomeStore()
  }

  handleSelect = value => {
    // eslint-disable-next-line no-console
    console.log(value)
  }

  render() {
    const { fetchList } = this.store

    return (
      <div>
        <h1 className="py-3">Home</h1>
        <p>{this.store.name}</p>
        <ScrollSelect
          onFetch={fetchList}
          placeholder={'请选择'}
          onSelect={this.handleSelect}
        />
      </div>
    )
  }
}

export default Home
