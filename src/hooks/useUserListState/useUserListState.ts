import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { createUserList, getCities, mergeUserNameEdits } from '@utils/createUserList'
import { parseUserQuery, updateUserQuery } from '@utils/userQuery'
import { USERS_PER_PAGE } from './constants'
import type { UseUserListState } from './types'

export const useUserListState: UseUserListState = ({ edits, users }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = parseUserQuery({ searchParams })
  const mergedUsers = useMemo(
    () => mergeUserNameEdits({ users, edits }),
    [users, edits],
  )
  const cities = useMemo(() => getCities({ users: mergedUsers }), [mergedUsers])
  const filteredUsers = useMemo(
    () =>
      createUserList({
        users: mergedUsers,
        search: query.search,
        cities: query.cities,
        edits,
        sortDirection: query.sortDirection,
        sortBy: query.sortBy,
      }),
    [
      mergedUsers,
      query.search,
      query.cities,
      query.sortDirection,
      query.sortBy,
      edits,
    ],
  )
  const pageCount = Math.max(1, Math.ceil(filteredUsers.length / USERS_PER_PAGE))
  const currentPage = Math.min(query.page, pageCount)
  const pageUsers = filteredUsers.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE,
  )

  const setQueryValues = ({
    values,
    replace,
  }: {
    readonly values: Readonly<Record<string, string>>
    readonly replace: boolean
  }) => {
    setSearchParams(updateUserQuery({ current: searchParams, values }), {
      replace,
    })
  }

  return {
    query,
    cities,
    filteredUsers,
    currentPage,
    pageCount,
    pageUsers,
    setQueryValues,
  }
}
