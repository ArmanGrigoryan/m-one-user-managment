import { useQuery } from '@tanstack/react-query'
import { fetchUsers } from '@api/usersService'
import { createDemoUsers, DEMO_USER_COUNT } from '@utils/createDemoUsers'
import { USERS_QUERY_KEY } from './constants'
import type { UseUsers } from './types'

export const useUsers: UseUsers = () => {
  const query = useQuery({
    queryKey: USERS_QUERY_KEY,
    queryFn: async ({ signal }) => {
      const users = await fetchUsers({ signal })
      return createDemoUsers({ users, count: DEMO_USER_COUNT })
    },
    retry: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })

  if (query.isPending) {
    return { status: 'loading', retry: query.refetch }
  }

  if (query.isError) {
    return {
      status: 'error',
      message: getErrorMessage(query.error),
      isRetrying: query.isFetching,
      retry: query.refetch,
    }
  }

  return { status: 'success', users: query.data, retry: query.refetch }
}

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message
  }

  return 'An unexpected error stopped the request.'
}
