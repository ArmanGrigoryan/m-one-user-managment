import type { FC } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@utils/cn'
import { buttonVariants } from './constants'
import type { ButtonProps } from './types'

export const Button: FC<ButtonProps> = ({
  className,
  variant,
  asChild = false,
  type = 'button',
  ...props
}) => {
  if (asChild) {
    return (
      <Slot className={cn(buttonVariants({ variant }), className)} {...props} />
    )
  }

  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    />
  )
}
