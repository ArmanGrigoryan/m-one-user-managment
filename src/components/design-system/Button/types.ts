import type { ButtonHTMLAttributes } from 'react'
import type { VariantProps } from 'class-variance-authority'
import type { buttonVariants } from './constants'

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  readonly asChild?: boolean
}
