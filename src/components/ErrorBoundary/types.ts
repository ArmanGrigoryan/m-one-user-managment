import type { ReactNode } from 'react'

export interface ErrorBoundaryProps {
  readonly children: ReactNode
  readonly title?: string
}

export interface ErrorBoundaryState {
  readonly error: Error | null
}
