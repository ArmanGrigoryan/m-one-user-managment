import type { FC } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { UserBackButton } from '@components/Users/UserBackButton'
import { UserDetailLoading } from '@components/Users/UserDetailLoading'
import { UserDetails } from '@components/Users/UserDetails'
import { UserNotFound } from '@components/Users/UserNotFound'
import { UsersErrorState } from '@components/Users/UsersErrorState'
import { useLayoutContext } from '@hooks/useLayoutContext'
import { mergeUserNameEdits } from '@utils/createUserList'
import { parseUserId } from '@utils/parseUserId'
import type { UserDetailContainerProps } from './types'

const UserDetailContainer: FC<UserDetailContainerProps> = () => {
  const { usersQuery, edits, saveName } = useLayoutContext()
  const { userId } = useParams()
  const parsedUserId = parseUserId({ value: userId })
  const users =
    usersQuery.status === 'success'
      ? mergeUserNameEdits({ users: usersQuery.users, edits })
      : []
  const user = users.find(({ id }) => id === parsedUserId)

  useEffect(() => {
    document.title =
      user === undefined ? 'Person · M-One' : `${user.name} · M-One`
  }, [user])

  return (
    <div>
      <UserBackButton />
      {usersQuery.status === 'loading' && <UserDetailLoading />}
      {usersQuery.status === 'error' && (
        <UsersErrorState
          message={usersQuery.message}
          onRetry={usersQuery.retry}
        />
      )}
      {usersQuery.status === 'success' && user === undefined && <UserNotFound />}
      {usersQuery.status === 'success' && user !== undefined && (
        <UserDetails
          key={user.id}
          user={user}
          onSave={saveName}
        />
      )}
    </div>
  )
}

export default UserDetailContainer
