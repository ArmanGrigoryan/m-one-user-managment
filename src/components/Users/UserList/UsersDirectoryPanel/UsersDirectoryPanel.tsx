import { useCallback, type FC } from 'react'
import { UsersFilters } from '@components/Users/UserList/UsersFilters'
import { UsersPagination } from '@components/Users/UserList/UsersPagination'
import { UsersTable } from '@components/Users/UserList/UsersTable'
import { USERS_PER_PAGE } from '@hooks/useUserListState'
import { cn } from '@utils/cn'
import type { UsersDirectoryPanelProps } from './types'

export const UsersDirectoryPanel: FC<UsersDirectoryPanelProps> = ({
  userList,
  className,
}) => {
  const { query, cities, pageUsers, filteredUsers, currentPage, pageCount, setQueryValues } = userList

  const hasActiveFilters = query.search.length > 0 || query.cities.length > 0

  const handleReset = (values: Record<string, string>, replace = false) =>
    setQueryValues({ values: { ...values, page: '1' }, replace })

  const handleSearchChange = (search: string) => handleReset({ q: search }, true)

  const handleCitiesChange = (selected: readonly string[]) => handleReset({ city: selected.join(',') })

  const handleSort = (field: string, direction: string) => handleReset({ sortBy: field, sort: direction })

  const handlePageChange = useCallback(
    (page: number) => setQueryValues({ values: { page: String(page) }, replace: false }),
    [setQueryValues],
  )

  return (
    <div className={cn('w-full max-w-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm', className)}>
      <UsersFilters
        search={query.search}
        selectedCities={query.cities}
        cities={cities}
        onSearchChange={handleSearchChange}
        onCitiesChange={handleCitiesChange}
      />
      <UsersTable
        users={pageUsers}
        hasActiveFilters={hasActiveFilters}
        sortDirection={query.sortDirection}
        sortField={query.sortBy}
        onSort={handleSort}
      />
      <UsersPagination
        page={currentPage}
        pageCount={pageCount}
        totalCount={filteredUsers.length}
        pageSize={USERS_PER_PAGE}
        onPageChange={handlePageChange}
      />
    </div>
  )
}
