import type { FC } from 'react'
import { Skeleton } from '@components/design-system/Skeleton'
import { USERS_TABLE_COLUMNS } from '@components/Users/UserList/UsersTable/constants'
import { cn } from '@utils/cn'
import type { UsersLoadingStateProps } from './types'

const SKELETON_ROW_COUNT = 10

export const UsersLoadingState: FC<UsersLoadingStateProps> = ({ className }) => {
  return (
    <div
      aria-label="Loading users"
      aria-busy="true"
      className={cn('overflow-hidden rounded-2xl border border-border bg-card', className)}
    >
      <div className="border-b border-border p-5">
        <Skeleton className="h-10 w-full max-w-md" />
      </div>
      <div className="divide-y divide-border">
        {Array.from({ length: SKELETON_ROW_COUNT }, (_, index) => (
          <div
            key={index}
            className="grid grid-cols-[1.5fr_2fr] gap-6 px-4 py-4 md:grid-cols-[2fr_2fr_1fr_1.5fr_40px]"
          >
            {USERS_TABLE_COLUMNS.map((col) => (
              <Skeleton
                key={col.field}
                className={cn('h-5', !col.mobileVisible && 'hidden md:block')}
              />
            ))}
            <Skeleton className="hidden h-5 w-8 md:block" />
          </div>
        ))}
      </div>
    </div>
  )
}
