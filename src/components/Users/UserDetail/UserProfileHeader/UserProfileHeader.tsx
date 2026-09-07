import type { FC } from 'react'
import { Avatar } from '@components/design-system/Avatar'
import { getInitials } from '@utils/getInitials'
import { cn } from '@utils/cn'
import type { UserProfileHeaderProps } from './types'

export const UserProfileHeader: FC<UserProfileHeaderProps> = ({ user, className }) => {
  return (
    <section className={cn('rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6', className)}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Avatar name={user.name} initials={getInitials({ name: user.name })} size="lg" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{user.name}</h1>
          <p className="mt-1 text-muted">
            @{user.username} · {user.company.name}
          </p>
        </div>
      </div>
    </section>
  )
}
