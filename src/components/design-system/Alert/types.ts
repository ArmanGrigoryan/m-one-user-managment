import type { ReactNode } from 'react'

export interface AlertProps {
  readonly children: ReactNode
  readonly tone?: 'error' | 'success'
  readonly className?: string
}
