import React from 'react'
import { Button } from 'antd'
import PropTypes from 'prop-types'

import styles from './index.scss'

const Footer = ({
  currentStep,
  handlePrev,
  handleNext,
  isReview,
  form,
  onCancel,
  isSubmitting,
}) => (
  <div className={styles.footer}>
    {currentStep > 0 && <Button onClick={handlePrev}>{t('Previous')}</Button>}
    <Button onClick={onCancel}>{t('Cancel')}</Button>
    <Button
      type="primary"
      loading={isSubmitting}
      onClick={isReview ? () => form.submit() : handleNext}
    >
      {isReview ? t('Create') : t('Next')}
    </Button>
  </div>
)

Footer.propTypes = {
  currentStep: PropTypes.number,
  handlePrev: PropTypes.func,
  handleNext: PropTypes.func,
  isReview: PropTypes.bool,
  form: PropTypes.object,
  onCancel: PropTypes.func,
  isSubmitting: PropTypes.bool,
}

export default Footer
