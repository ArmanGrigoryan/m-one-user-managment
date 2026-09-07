import type { FC } from 'react'
import { cn } from '@utils/cn'
import type { InputProps } from './types'

export const Input: FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      className={cn(
        'h-10 w-full rounded-lg border border-border bg-card px-3 text-base text-foreground outline-none transition-colors placeholder:text-muted focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20 sm:text-sm',
        className,
      )}
      {...props}
    />
  )
}
