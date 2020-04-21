import React, { useCallback, useState, useEffect } from 'react'
import { Form } from 'antd'
import Steps from 'components/Steps'
import { get, isEmpty } from 'lodash'
import { LAYOUT } from 'utils'
import PropTypes from 'prop-types'

import styles from './index.scss'
import Footer from './Footer'

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
    const { formItem } = props
    // no step
    if (!steps && formItem) {
      return formItem
    }
    // Step Component
    const Component = get(steps, `[${currentStep}].component`)

    return <Component />
  }

  const isReview = steps ? currentStep === steps.length - 1 : true

  const renderSteps = () => {
    if (steps && steps.length > 1) {
      return <Steps steps={steps} current={currentStep} />
    }
    return null
  }

  const renderFooter = () => (
    <Footer
      currentStep={currentStep}
      handlePrev={handlePrev}
      handleNext={handleNext}
      isReview={isReview}
      form={form}
      onCancel={onCancel}
      isSubmitting={isSubmitting}
    />
  )

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
      {renderFooter()}
    </div>
  )
}

FormMode.propTypes = {
  module: PropTypes.string,
  type: PropTypes.string,
  steps: PropTypes.array,
  formTemplate: PropTypes.object,
  isSubmitting: PropTypes.bool,
  onOk: PropTypes.func,
  detail: PropTypes.object,
}

export default FormMode
