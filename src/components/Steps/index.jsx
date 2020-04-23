/*
 * Created: Tue Apr 21 2020
 * Author: Apple
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Steps } from 'antd'

import styles from './index.scss'

const { Step } = Steps

const StepCom = props => (
  <Steps current={props.current} className={styles.steps}>
    {props.steps.map((step, index) => (
      <Step key={index} title={step.title} />
    ))}
  </Steps>
)

export default StepCom

StepCom.propTypes = {
  steps: PropTypes.array.isRequired,
  current: PropTypes.number.isRequired,
}
