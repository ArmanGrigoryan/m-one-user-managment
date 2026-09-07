import type { FC } from 'react'
import { UsersDirectoryPanel as UsersList } from '@components/Users/UsersDirectoryPanel'
import { UsersErrorState } from '@components/Users/UsersErrorState'
import { UsersHeader } from '@components/Users/UsersHeader'
import { UsersLoadingState } from '@components/Users/UsersLoadingState'
import { useDocumentTitle } from '@hooks/useDocumentTitle'
import { useUserEdits } from '@hooks/useUserEdits'
import { EMPTY_USERS, useUserListState } from '@hooks/useUserListState'
import { useUsers } from '@hooks/useUsers'
import type { UserListContainerProps } from './types'

const PAGE_TITLE = 'People · M-One'

const UserListContainer: FC<UserListContainerProps> = () => {
  useDocumentTitle(PAGE_TITLE)
  const fetchedUsers = useUsers()
  const { edits: localNameEdits } = useUserEdits()
  const serverUsers = fetchedUsers.status === 'success' ? fetchedUsers.users : EMPTY_USERS
  const directory = useUserListState({ edits: localNameEdits, users: serverUsers })

  return (
    <>
      <UsersHeader />
      {fetchedUsers.status === 'loading' && <UsersLoadingState />}
      {fetchedUsers.status === 'error' && <UsersErrorState message={fetchedUsers.message} onRetry={fetchedUsers.retry} />}
      {fetchedUsers.status === 'success' && <UsersList directory={directory} />}
    </>
  )
}

export default UserListContainer
