import type { HTMLAttributes } from 'react'
import type { VariantProps } from 'class-variance-authority'
import type { badgeVariants } from './constants'

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}
