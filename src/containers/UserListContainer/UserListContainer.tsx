import type { FC } from 'react'
import { UsersDirectoryPanel as UsersList } from '@components/Users/UserList/UsersDirectoryPanel'
import { UsersErrorState } from '@components/Users/UserList/UsersErrorState'
import { UsersHeader } from '@components/Users/UserList/UsersHeader'
import { UsersLoadingState } from '@components/Users/UserList/UsersLoadingState'
import { useDocumentTitle } from '@hooks/useDocumentTitle'
import { useUserEdits } from '@hooks/useUserEdits'
import { EMPTY_USERS, useUserListState } from '@hooks/useUserListState'
import { useUsers } from '@hooks/useUsers'
import { DEMO_USER_COUNT } from '@utils/createDemoUsers'
import type { UserListContainerProps } from './types'

const PAGE_TITLE = 'People · M-One'

const UserListContainer: FC<UserListContainerProps> = () => {
  useDocumentTitle(PAGE_TITLE)
  const fetchedUsers = useUsers()
  const { edits: localNameEdits } = useUserEdits()
  const serverUsers = fetchedUsers.status === 'success' ? fetchedUsers.users : EMPTY_USERS
  const userList = useUserListState({ edits: localNameEdits, users: serverUsers })

  return (
    <>
      <UsersHeader demoUserCount={DEMO_USER_COUNT} />
      {fetchedUsers.status === 'loading' && <UsersLoadingState />}
      {fetchedUsers.status === 'error' && <UsersErrorState message={fetchedUsers.message} onRetry={fetchedUsers.retry} isRetrying={fetchedUsers.isRetrying} />}
      {fetchedUsers.status === 'success' && <UsersList userList={userList} />}
    </>
  )
}

export default UserListContainer
