import type { FC } from 'react'
import { cn } from '@utils/cn'
import type { AlertProps } from './types'

const getToneClass = (tone: 'error' | 'success') => {
  if (tone === 'success') {
    return 'bg-emerald-50 text-success'
  }

  return 'bg-red-50 text-danger'
}

export const Alert: FC<AlertProps> = ({ children, tone = 'error', className }) => {
  return (
    <p
      role="alert"
      className={cn(
        'rounded-lg px-3 py-2 text-sm',
        getToneClass(tone),
        className,
      )}
    >
      {children}
    </p>
  )
}
