import React from 'react'
import { Form, Input } from 'antd'

export default () => (
  <React.Fragment>
    <Form.Item
      name="metadata.name"
      label={t('Name')}
      rules={[{ required: true, message: t('Please input name') }]}
    >
      <Input name="name" autoFocus={true} />
    </Form.Item>
    <Form.Item
      name="description"
      label={t('Description')}
      rules={[{ required: true, message: t('Please input description') }]}
    >
      <Input.TextArea />
    </Form.Item>
  </React.Fragment>
)
