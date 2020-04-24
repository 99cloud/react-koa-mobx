/*
 * Created: Tue Apr 21 2020
 * Author: Apple
 */

import React from 'react'

import styles from './index.scss'

export default class NotFound extends React.Component {
  state = {
    time: 10,
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(({ time }) => ({
        time: Math.max(time - 1, 0),
      }))
    }, 1100)
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.time === 0) {
      if (this.interval) {
        clearInterval(this.interval)
      }

      location.href = '/'
    }
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <img className={styles.image} src="/assets/empty-card.svg" alt="" />
        <div className={styles.text}>
          <div className="h1">Not Found</div>
          <p>
            {t('NOT_FOUND_DESC', {
              time: this.state.time,
              link: '/',
            })}
          </p>
        </div>
      </div>
    )
  }
}
