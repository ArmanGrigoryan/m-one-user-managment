import type { ReactNode } from 'react'

export interface ContactRowProps {
  readonly icon: ReactNode
  readonly label: string
  readonly value: ReactNode
}
