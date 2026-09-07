import type { SortDirection, SortField } from '@api/usersService'

export interface UserQuery {
  readonly search: string
  readonly cities: readonly string[]
  readonly sortDirection: SortDirection
  readonly sortBy: SortField
  readonly page: number
}

export interface ParseUserQueryArgs {
  readonly searchParams: URLSearchParams
}
export type ParseUserQueryResult = UserQuery
export type ParseUserQuery = (args: ParseUserQueryArgs) => ParseUserQueryResult

export interface UpdateUserQueryArgs {
  readonly current: URLSearchParams
  readonly values: Readonly<Record<string, string>>
}
export type UpdateUserQueryResult = URLSearchParams
export type UpdateUserQuery = (args: UpdateUserQueryArgs) => UpdateUserQueryResult
