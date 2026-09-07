import type { FC } from 'react'
import * as DropdownPrimitive from '@radix-ui/react-dropdown-menu'
import { cn } from '@utils/cn'
import type {
  DropdownMenuContentProps,
  DropdownMenuItemProps,
  DropdownMenuLabelProps,
  DropdownMenuSeparatorProps,
} from './types'

export const DropdownMenu = DropdownPrimitive.Root
export const DropdownMenuTrigger = DropdownPrimitive.Trigger

export const DropdownMenuContent: FC<DropdownMenuContentProps> = ({
  className,
  sideOffset = 5,
  ...props
}) => {
  return (
    <DropdownPrimitive.Portal>
      <DropdownPrimitive.Content
        className={cn(
          'z-50 min-w-44 rounded-lg border border-border bg-card p-1 shadow-lg',
          className,
        )}
        sideOffset={sideOffset}
        {...props}
      />
    </DropdownPrimitive.Portal>
  )
}

export const DropdownMenuItem: FC<DropdownMenuItemProps> = ({
  className,
  ...props
}) => {
  return (
    <DropdownPrimitive.Item
      className={cn(
        'flex cursor-default items-center gap-2 rounded-md px-2 py-2 text-sm outline-none data-[highlighted]:bg-slate-100',
        className,
      )}
      {...props}
    />
  )
}

export const DropdownMenuLabel: FC<DropdownMenuLabelProps> = ({
  className,
  ...props
}) => {
  return (
    <DropdownPrimitive.Label
      className={cn('px-2 py-1.5 text-xs font-semibold text-muted', className)}
      {...props}
    />
  )
}

export const DropdownMenuSeparator: FC<DropdownMenuSeparatorProps> = ({
  className,
  ...props
}) => {
  return (
    <DropdownPrimitive.Separator
      className={cn('-mx-1 my-1 h-px bg-border', className)}
      {...props}
    />
  )
}
