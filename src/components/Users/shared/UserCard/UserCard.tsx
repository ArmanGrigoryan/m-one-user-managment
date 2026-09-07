import { memo } from 'react'
import type { FC } from 'react'
import { Avatar } from '@components/design-system/Avatar'
import { RowActions } from '@components/Users/shared/RowActions'
import { getInitials } from '@utils/getInitials'
import { cn } from '@utils/cn'
import type { UserCardProps } from './types'

export const UserCard: FC<UserCardProps> = memo(({ user, className }) => {
  return (
    <article className={cn('relative flex w-full min-w-0 max-w-full items-start gap-3 overflow-hidden rounded-xl p-4 pr-14', className)}>
      <Avatar name={user.name} initials={getInitials({ name: user.name })} />
      <div className="min-w-0 flex-1">
        <p aria-label={`User ${user.name}`} className="font-semibold">
          {user.name}
        </p>
        <p className="truncate text-sm text-muted">{user.email}</p>
        <p className="mt-1 text-sm text-muted">{user.address.city}</p>
      </div>
      <div className="absolute top-3 right-3">
        <RowActions userId={user.id} userName={user.name} />
      </div>
    </article>
  )
})
