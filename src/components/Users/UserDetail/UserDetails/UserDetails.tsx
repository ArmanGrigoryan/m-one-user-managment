import type { FC } from 'react'
import { UserContactList } from '@components/Users/UserDetail/UserContactList'
import { UserNameForm } from '@components/Users/UserDetail/UserNameForm'
import { UserProfileHeader } from '@components/Users/UserDetail/UserProfileHeader'
import { cn } from '@utils/cn'
import type { UserDetailsProps } from './types'

export const UserDetails: FC<UserDetailsProps> = ({
  user,
  onSave,
  className,
}) => {
  return (
    <div className={cn('space-y-4', className)}>
      <UserProfileHeader user={user} />
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,1fr)]">
        <UserContactList user={user} />
        <UserNameForm
          userId={user.id}
          currentName={user.name}
          onSave={onSave}
        />
      </div>
    </div>
  )
}
