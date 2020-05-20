/*
 * Created: Tue Apr 21 2020
 * Author: Apple
 */

import { notification } from 'antd'

import styles from './index.scss'

const openNotificationWithIcon = (message, description, type) => {
  notification[type]({
    className: !description && styles.notify,
    message,
    description,
  })
}

export default {
  success: ({ message, description }) =>
    openNotificationWithIcon(message, description, 'success'),

  info: ({ message, description }) =>
    openNotificationWithIcon(message, description, 'info'),

  warning: ({ message, description }) =>
    openNotificationWithIcon(message, description, 'warning'),

  error: ({ message, description }) =>
    openNotificationWithIcon(message, description, 'error'),
}
