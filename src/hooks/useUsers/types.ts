import type { User } from '@api/usersService'

type UsersState =
  | { readonly status: 'loading' }
  | { readonly status: 'success'; readonly users: readonly User[] }
  | { readonly status: 'error'; readonly message: string; readonly isRetrying: boolean }

export type UsersQuery = UsersState & {
  readonly retry: () => void
}

export type UseUsersResult = UsersQuery
export type UseUsers = () => UseUsersResult

export const USERS_QUERY_KEY = ['users'] as const
