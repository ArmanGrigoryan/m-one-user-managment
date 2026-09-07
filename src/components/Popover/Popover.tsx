import type { FC } from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { cn } from '@utils/cn'
import type { PopoverContentProps } from './types'

export const Popover = PopoverPrimitive.Root
export const PopoverTrigger = PopoverPrimitive.Trigger
export const PopoverAnchor = PopoverPrimitive.Anchor

export const PopoverContent: FC<PopoverContentProps> = ({
  className,
  sideOffset = 5,
  align = 'start',
  ...props
}) => {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        className={cn(
          'z-50 w-72 rounded-lg border border-border bg-card shadow-lg outline-none',
          className,
        )}
        sideOffset={sideOffset}
        align={align}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
}
