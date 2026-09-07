import type { FC } from 'react'
import { UsersFilters } from '@components/Users/UsersFilters'
import { UsersPagination } from '@components/Users/UsersPagination'
import { UsersTable } from '@components/Users/UsersTable'
import { USERS_PER_PAGE } from '@hooks/useUserListState/constants'
import { cn } from '@utils/cn'
import type { UsersDirectoryPanelProps } from './types'

export const UsersDirectoryPanel: FC<UsersDirectoryPanelProps> = ({
  directory,
  className,
}) => {
  return (
    <div className={cn('w-full max-w-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm', className)}>
      <UsersFilters
        search={directory.query.search}
        selectedCities={directory.query.cities}
        cities={directory.cities}
        onSearchChange={(search) => {
          directory.setQueryValues({
            values: { q: search, page: '1' },
            replace: true,
          })
        }}
        onCitiesChange={(cities) => {
          directory.setQueryValues({
            values: { city: cities.join(','), page: '1' },
            replace: false,
          })
        }}
      />
      <UsersTable
        users={directory.pageUsers}
        hasActiveFilters={
          directory.query.search.length > 0 ||
          directory.query.cities.length > 0
        }
        sortDirection={directory.query.sortDirection}
        sortField={directory.query.sortBy}
        onSort={(field, direction) => {
          directory.setQueryValues({
            values: { sortBy: field, sort: direction, page: '1' },
            replace: false,
          })
        }}
      />
      <UsersPagination
        page={directory.currentPage}
        pageCount={directory.pageCount}
        totalCount={directory.filteredUsers.length}
        pageSize={USERS_PER_PAGE}
        onPageChange={(page) => {
          directory.setQueryValues({
            values: { page: String(page) },
            replace: false,
          })
        }}
      />
    </div>
  )
}
