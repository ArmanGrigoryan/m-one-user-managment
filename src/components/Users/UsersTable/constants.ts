import type { SortField } from '@api/usersService'

export interface UserTableColumn {
  readonly field: SortField
  readonly label: string
  readonly mobileVisible: boolean
}

export const USERS_TABLE_COLUMNS: readonly UserTableColumn[] = [
  { field: 'name', label: 'Name', mobileVisible: true },
  { field: 'email', label: 'Email', mobileVisible: true },
  { field: 'city', label: 'City', mobileVisible: false },
  { field: 'company', label: 'Company', mobileVisible: false },
]
