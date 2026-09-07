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
          'z-50 w-[calc(100vw-2rem)] rounded-lg border border-border bg-card shadow-lg outline-none sm:w-72',
          className,
        )}
        sideOffset={sideOffset}
        align={align}
        collisionPadding={16}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
}
