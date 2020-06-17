/*
 * Created: Fri May 22 2020
 * Author: Apple
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Select } from 'antd'

const { Option } = Select

class ScrollSelect extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pageSize: 10,
      scrollPage: 1,
      data: [],
      loading: false,
    }
  }

  static propTypes = {
    onFetch: PropTypes.func,
  }

  static defaultProps = {
    pageSize: 10,
  }

  componentDidMount() {
    this.fetchOnScroll()
  }

  handleScroll = e => {
    e.persist()
    const { target } = e
    if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
      const { scrollPage } = this.state
      const nextScrollPage = scrollPage + 1
      this.setState({ scrollPage: nextScrollPage })
      this.fetchOnScroll(nextScrollPage)
    }
  }

  fetchOnScroll = nextScrollPage => {
    const { onFetch, pageSize } = this.props
    this.setState(
      {
        loading: true,
      },
      async () => {
        const data = await onFetch({ pageSize, current: nextScrollPage })
        if (data) {
          this.setState({
            loading: false,
            data: this.state.data.concat(data),
          })
        }
      }
    )
  }

  render() {
    const { data, loading } = this.state
    const { placeholder, onSelect } = this.props

    return (
      <Select
        placeholder={placeholder}
        loading={loading}
        onSelect={onSelect}
        onPopupScroll={this.handleScroll}
      >
        {data &&
          data.map(item => (
            <Option value={item.value} key={item.value}>
              {item.value}
            </Option>
          ))}
      </Select>
    )
  }
}

export default ScrollSelect
