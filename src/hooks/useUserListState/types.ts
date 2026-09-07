import type { User, UserNameEdits } from '@api/usersService'
import type { UserQuery } from '@utils/userQuery'

export interface UseUserListStateArgs {
  readonly edits: UserNameEdits
  readonly users: readonly User[]
}

export interface SetQueryValuesArgs {
  readonly values: Readonly<Record<string, string>>
  readonly replace: boolean
}

export interface UseUserListStateResult {
  readonly query: UserQuery
  readonly cities: string[]
  readonly filteredUsers: User[]
  readonly currentPage: number
  readonly pageCount: number
  readonly pageUsers: User[]
  readonly setQueryValues: (args: SetQueryValuesArgs) => void
}

export type UseUserListState = (args: UseUserListStateArgs) => UseUserListStateResult
