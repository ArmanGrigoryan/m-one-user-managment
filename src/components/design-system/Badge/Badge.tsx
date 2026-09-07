import type { FC } from 'react'
import { cn } from '@utils/cn'
import { badgeVariants } from './constants'
import type { BadgeProps } from './types'

export const Badge: FC<BadgeProps> = ({ className, variant, ...props }) => {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}
