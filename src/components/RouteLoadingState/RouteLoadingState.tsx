import type { FC } from 'react'
import { cn } from '@utils/cn'
import type { RouteLoadingStateProps } from './types'

export const RouteLoadingState: FC<RouteLoadingStateProps> = ({ className }) => {
  return (
    <div
      aria-label="Loading page"
      className={cn('grid min-h-[360px] place-items-center text-sm text-muted', className)}
    >
      Loading page
    </div>
  )
}
