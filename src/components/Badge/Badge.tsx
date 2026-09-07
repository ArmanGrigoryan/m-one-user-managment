import type { FC } from 'react'
import { cn } from '@utils/cn'
import type { BadgeProps } from './types'
import { badgeVariants } from './types'

export const Badge: FC<BadgeProps> = ({ className, variant, ...props }) => {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}
