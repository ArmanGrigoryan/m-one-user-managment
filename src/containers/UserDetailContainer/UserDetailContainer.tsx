import { useMemo, type FC } from 'react'
import { useParams } from 'react-router-dom'
import { UserBackButton } from '@components/Users/UserBackButton'
import { UserDetailLoading } from '@components/Users/UserDetailLoading'
import { UserDetails } from '@components/Users/UserDetails'
import { UserNotFound } from '@components/Users/UserNotFound'
import { UsersErrorState } from '@components/Users/UsersErrorState'
import { useDocumentTitle } from '@hooks/useDocumentTitle'
import { useUserEdits } from '@hooks/useUserEdits'
import { EMPTY_USERS } from '@hooks/useUserListState'
import { useUsers } from '@hooks/useUsers'
import { mergeUserNameEdits } from '@utils/createUserList'
import { parseUserId } from '@utils/parseUserId'
import type { UserDetailContainerProps } from './types'

const DEFAULT_PAGE_TITLE = 'Person · M-One'

const UserDetailContainer: FC<UserDetailContainerProps> = () => {
  const { userId } = useParams()
  const fetchedUsers = useUsers()
  const { edits: localNameEdits, saveName } = useUserEdits()

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

  const pageTitle = user !== undefined ? `${user.name} · M-One` : DEFAULT_PAGE_TITLE
  useDocumentTitle(pageTitle)

  return (
    <div>
      <UserBackButton />
      {fetchedUsers.status === 'loading' && <UserDetailLoading />}
      {fetchedUsers.status === 'error' && (
        <UsersErrorState
          message={fetchedUsers.message}
          onRetry={fetchedUsers.retry}
          isRetrying={fetchedUsers.isRetrying}
        />
      )}
      {fetchedUsers.status === 'success' && (user ? <UserDetails key={user.id} user={user} onSave={saveName} /> : <UserNotFound />)}
    </div>
  )
}

export default UserDetailContainer
