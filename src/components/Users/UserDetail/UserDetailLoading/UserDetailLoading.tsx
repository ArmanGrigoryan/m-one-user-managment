import type { FC } from 'react'
import { Skeleton } from '@components/design-system/Skeleton'
import { cn } from '@utils/cn'
import type { UserDetailLoadingProps } from './types'

export const UserDetailLoading: FC<UserDetailLoadingProps> = ({ className }) => {
  return (
    <div aria-busy="true" className={cn('rounded-2xl border border-border bg-card p-6', className)}>
      <div className="space-y-4">
        <Skeleton className="h-16 w-16 rounded-full" />
        <Skeleton className="h-10 w-1/2" />
        <Skeleton className="h-64" />
      </div>
    </div>
  )
}
