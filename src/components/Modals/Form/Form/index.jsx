/*
 * Created: Tue Apr 21 2020
 * Author: Apple
 */

import React, { useCallback, useState, useEffect } from 'react'
import { Form, Button } from 'antd'
import Steps from 'components/Steps'
import { get, isEmpty, isArray } from 'lodash'
import { LAYOUT } from 'utils'
import PropTypes from 'prop-types'

import styles from './index.scss'

const FormMode = props => {
  const [form] = Form.useForm()
  const [currentStep, setCurrentStep] = useState(0)

  const {
    steps,
    layout = LAYOUT,
    onOk,
    onCancel,
    detail,
    isSubmitting,
    visible,
  } = props

  useEffect(() => {
    if (!visible) {
      form.resetFields()
    }
  }, [visible])

  useEffect(() => {
    if (visible && !isEmpty(detail)) {
      const initialValues = {}
      const nameLists = form && Object.keys(form.getFieldsValue())

      nameLists.forEach(name => {
        initialValues[name] = get(detail, name)
      })

      form.setFieldsValue({
        ...initialValues,
      })
    }
  }, [detail, currentStep])

  const handleFinish = useCallback(() => {
    const values = form.getFieldsValue(true)

    onOk(values)
  }, [form])

  const handleNext = () => {
    form.validateFields().then(() => {
      const stepCount = steps.length
      setCurrentStep(Math.min(currentStep + 1, stepCount - 1))
    })
  }

  const handlePrev = () => {
    form.validateFields().then(() => {
      let step = currentStep

      step = Math.max(currentStep - 1, 0)
      setCurrentStep(step)
    })
  }

  const renderFormItem = () => {
    if (!isArray(steps)) {
      return steps
    }

    const Component = get(steps, `[${currentStep}].component`)

    return <Component />
  }

  const isReview = isArray(steps) ? currentStep === steps.length - 1 : true

  const renderSteps = () => {
    if (isArray(steps) && steps.length > 1) {
      return <Steps steps={steps} current={currentStep} />
    }
    return null
  }

  return (
    <div className={styles.contentWrapper}>
      {renderSteps()}
      <Form
        layout="horizontal"
        className={styles.content}
        {...layout}
        form={form}
        onFinish={handleFinish}
      >
        {renderFormItem()}
      </Form>
      <div className={styles.footer}>
        {currentStep > 0 && (
          <Button onClick={handlePrev}>{t('Previous')}</Button>
        )}
        <Button onClick={onCancel}>{t('Cancel')}</Button>
        <Button
          type="primary"
          loading={isSubmitting}
          onClick={isReview ? () => form.submit() : handleNext}
        >
          {isReview ? t('Create') : t('Next')}
        </Button>
      </div>
    </div>
  )
}

FormMode.propTypes = {
  module: PropTypes.string,
  type: PropTypes.string,
  steps: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
  formTemplate: PropTypes.object,
  isSubmitting: PropTypes.bool,
  onOk: PropTypes.func,
  detail: PropTypes.object,
}

export default FormMode
