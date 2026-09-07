import type { SortDirection, SortField, User } from '@api/usersService'

export type UsersTableOnSort = (field: SortField, direction: SortDirection) => void

export interface UsersTableProps {
  readonly users: readonly User[]
  readonly hasActiveFilters: boolean
  readonly sortDirection: SortDirection
  readonly sortField: SortField
  readonly onSort: UsersTableOnSort
  readonly className?: string
}
