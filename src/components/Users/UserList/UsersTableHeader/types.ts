import type { SortDirection, SortField } from '@api/usersService'

export type UsersTableHeaderOnSort = (field: SortField, direction: SortDirection) => void

export interface UsersTableHeaderProps {
  readonly sortDirection: SortDirection
  readonly sortField: SortField
  readonly onSort: UsersTableHeaderOnSort
}
