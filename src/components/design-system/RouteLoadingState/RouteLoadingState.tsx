import type { FC } from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@utils/cn'
import type { RouteLoadingStateProps } from './types'

export const RouteLoadingState: FC<RouteLoadingStateProps> = ({ className }) => {
  return (
    <div
      aria-label="Loading page"
      className={cn('grid min-h-[360px] place-items-center text-muted', className)}
    >
      <Loader2 className="h-6 w-6 animate-spin" />
    </div>
  )
}
