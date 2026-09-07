import type { SortDirection, SortField, User, UserNameEdits } from '@api/usersService'

export interface CreateUserListArgs {
  readonly users: readonly User[]
  readonly search: string
  readonly cities: readonly string[]
  readonly sortDirection: SortDirection
  readonly sortBy: SortField
}
export type CreateUserListResult = User[]
export type CreateUserList = (args: CreateUserListArgs) => CreateUserListResult

export interface MergeUserNameEditsArgs {
  readonly users: readonly User[]
  readonly edits: UserNameEdits
}
export type MergeUserNameEditsResult = User[]
export type MergeUserNameEdits = (args: MergeUserNameEditsArgs) => MergeUserNameEditsResult

export interface GetCitiesArgs {
  readonly users: readonly User[]
}
export type GetCitiesResult = string[]
export type GetCities = (args: GetCitiesArgs) => GetCitiesResult
