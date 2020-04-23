import React from 'react'
import { Form, Input } from 'antd'

export default () => (
  <>
    <Form.Item name="note" label={t('Note')} rules={[]}>
      <Input name="note" autoFocus={true} />
    </Form.Item>
  </>
)
