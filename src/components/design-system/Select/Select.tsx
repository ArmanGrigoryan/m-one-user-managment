import type { FC } from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '@utils/cn'
import type { SelectContentProps, SelectItemProps, SelectTriggerProps } from './types'

export const Select = SelectPrimitive.Root
export const SelectValue = SelectPrimitive.Value

export const SelectTrigger: FC<SelectTriggerProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <SelectPrimitive.Trigger
      className={cn(
        'flex h-10 min-w-40 items-center justify-between gap-2 rounded-lg border border-border bg-card px-3 text-sm outline-none hover:bg-slate-50 focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20',
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon>
        <ChevronDown className="h-4 w-4 text-muted" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

export const SelectContent: FC<SelectContentProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        className={cn(
          'z-50 max-h-72 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-lg border border-border bg-card p-1 shadow-lg',
          className,
        )}
        position="popper"
        sideOffset={5}
        {...props}
      >
        <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

export const SelectItem: FC<SelectItemProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <SelectPrimitive.Item
      className={cn(
        'relative flex cursor-default items-center rounded-md py-2 pr-8 pl-2 text-sm outline-none data-[highlighted]:bg-slate-100',
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="absolute right-2">
        <Check className="h-4 w-4 text-accent" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}
