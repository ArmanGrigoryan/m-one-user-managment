import type { FC } from 'react'
import { cn } from '@utils/cn'
import type { AvatarProps } from './types'

const getAvatarSizeClass = (size: 'sm' | 'lg') => {
  if (size === 'lg') {
    return 'h-16 w-16 text-xl'
  }

  return 'h-9 w-9 text-xs'
}

export const Avatar: FC<AvatarProps> = ({ name, initials, size = 'sm', className }) => {
  return (
    <span
      aria-hidden="true"
      title={name}
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full bg-accent font-semibold text-white',
        getAvatarSizeClass(size),
        className,
      )}
    >
      {initials}
    </span>
  )
}
