import type { FC } from 'react'
import { Toast } from '@components/Toast'
import type { StorageErrorToastProps } from './types'

export const StorageErrorToast: FC<StorageErrorToastProps> = ({ message, onClose }) => {
  return <Toast message={message} onClose={onClose} />
}
