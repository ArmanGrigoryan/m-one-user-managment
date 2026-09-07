import type { FC } from 'react'
import { useEffect } from 'react'
import { UsersDirectoryPanel } from '@components/Users/UsersDirectoryPanel'
import { UsersErrorState } from '@components/Users/UsersErrorState'
import { UsersHeader } from '@components/Users/UsersHeader'
import { UsersLoadingState } from '@components/Users/UsersLoadingState'
import { useLayoutContext } from '@hooks/useLayoutContext'
import { EMPTY_USERS, useUserListState } from '@hooks/useUserListState'
import type { UserListContainerProps } from './types'

const UserListContainer: FC<UserListContainerProps> = () => {
  const { usersQuery, edits } = useLayoutContext()
  const serverUsers = usersQuery.status === 'success' ? usersQuery.users : EMPTY_USERS
  const directory = useUserListState({ edits, users: serverUsers })

  useEffect(() => {
    document.title = 'People · M-One'
  }, [])

  return (
    <>
      <UsersHeader />
      {usersQuery.status === 'loading' && <UsersLoadingState />}
      {usersQuery.status === 'error' && (
        <UsersErrorState
          message={usersQuery.message}
          onRetry={usersQuery.retry}
        />
      )}
      {usersQuery.status === 'success' && (
        <UsersDirectoryPanel directory={directory} />
      )}
    </>
  )
}

export default UserListContainer
