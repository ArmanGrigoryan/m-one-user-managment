import type { FC } from 'react'
import { useParams } from 'react-router-dom'
import { StorageErrorToast } from '@components/StorageErrorToast'
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

const UserDetailContainer: FC<UserDetailContainerProps> = () => {
  const fetchedUsers = useUsers()
  const { edits: localNameEdits, saveName, storageError, clearStorageError } = useUserEdits()
  const { userId } = useParams()
  const parsedUserId = parseUserId({ value: userId })
  const users =
    fetchedUsers.status === 'success'
      ? mergeUserNameEdits({ users: fetchedUsers.users, edits: localNameEdits })
      : []
  const user = users.find(({ id }) => id === parsedUserId)

  useDocumentTitle(user === undefined ? 'Person · M-One' : `${user.name} · M-One`)

  if (fetchedUsers.status === 'loading') {
    return <div><UserBackButton /><UserDetailLoading /></div>
  }

  if (fetchedUsers.status === 'error') {
    return <div><UserBackButton /><UsersErrorState message={fetchedUsers.message} onRetry={fetchedUsers.retry} /></div>
  }

  return (
    <div>
      <UserBackButton />
      {user === undefined ? <UserNotFound /> : <UserDetails key={user.id} user={user} onSave={saveName} />}
      <StorageErrorToast message={storageError} onClose={clearStorageError} />
    </div>
  )
}

export default UserDetailContainer
