import { useQuery } from '@tanstack/react-query'
import { fetchUsers } from '@api/usersService'
import type { User } from '@api/usersService'
import { createDemoUsers, DEMO_USER_COUNT } from '@utils/createDemoUsers'
import type { UseUsers } from './types'
import { USERS_QUERY_KEY } from './types'

export const useUsers: UseUsers = () => {
  const query = useQuery({
    queryKey: USERS_QUERY_KEY,
    queryFn: async ({ signal }) => {
      const users = await fetchUsers({ signal })
      return prepareUsers(users)
    },
    retry: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })

  if (query.isPending) {
    return { status: 'loading', retry: query.refetch }
  }

  if (query.isError) {
    return { status: 'error', message: getErrorMessage(query.error), isRetrying: query.isFetching, retry: query.refetch }
  }

  return { status: 'success', users: query.data, retry: query.refetch }
}

const prepareUsers = (users: readonly User[]): readonly User[] => {
  if (import.meta.env.MODE === 'test') {
    return users as User[]
  }

  return createDemoUsers({ users, count: DEMO_USER_COUNT })
}

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message
  }

  return 'An unexpected error stopped the request.'
}
