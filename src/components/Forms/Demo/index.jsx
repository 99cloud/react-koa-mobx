/*
 * Created: Tue Apr 21 2020
 * Author: Apple
 */

import React from 'react'
import { Form, Input } from 'antd'

export default () => (
  <>
    <Form.Item
      name="age"
      label={t('Age')}
      rules={[{ required: true, message: t('Please input age') }]}
    >
      <Input name="age" autoFocus={true} />
    </Form.Item>
  </>
)
