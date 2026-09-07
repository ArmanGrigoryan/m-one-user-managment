import { useMemo, type FC } from 'react'
import { useParams } from 'react-router-dom'
import { UserBackButton } from '@components/Users/UserBackButton'
import { UserDetailLoading } from '@components/Users/UserDetailLoading'
import { UserDetails } from '@components/Users/UserDetails'
import { UserNotFound } from '@components/Users/UserNotFound'
import { UsersErrorState } from '@components/Users/UsersErrorState'
import { useDocumentTitle } from '@hooks/useDocumentTitle'
import { useUserEdits } from '@hooks/useUserEdits'
import { useUsers } from '@hooks/useUsers'
import { mergeUserNameEdits } from '@utils/createUserList'
import { parseUserId } from '@utils/parseUserId'
import type { UserDetailContainerProps } from './types'

const EMPTY_USERS: readonly never[] = []

const UserDetailContainer: FC<UserDetailContainerProps> = () => {
  const fetchedUsers = useUsers()
  const { edits: localNameEdits, saveName } = useUserEdits()
  const { userId } = useParams()
  const parsedUserId = parseUserId({ value: userId })

  const serverUsers = fetchedUsers.status === 'success' ? fetchedUsers.users : EMPTY_USERS

  const users = useMemo(
    () => mergeUserNameEdits({ users: serverUsers, edits: localNameEdits }),
    [serverUsers, localNameEdits],
  )

  const user = useMemo(
    () => users.find(({ id }) => id === parsedUserId),
    [users, parsedUserId],
  )

  useDocumentTitle(user === undefined ? 'Person · M-One' : `${user.name} · M-One`)

  if (fetchedUsers.status === 'loading') {
    return (
      <div>
        <UserBackButton />
        <UserDetailLoading />
      </div>
    )
  }

  if (fetchedUsers.status === 'error') {
    return (
      <div>
        <UserBackButton />
        <UsersErrorState
          message={fetchedUsers.message}
          onRetry={fetchedUsers.retry}
          isRetrying={fetchedUsers.isRetrying}
        />
      </div>
    )
  }

  return (
    <div>
      <UserBackButton />
      {user === undefined
        ? <UserNotFound />
        : <UserDetails key={user.id} user={user} onSave={saveName} />}
    </div>
  )
}

export default UserDetailContainer
