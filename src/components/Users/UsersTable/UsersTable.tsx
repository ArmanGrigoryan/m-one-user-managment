import type { FC } from 'react'
import { Table, TableBody } from '@components/Table'
import { UsersEmptyState } from '@components/Users/UsersEmptyState'
import { UserCard } from '@components/Users/UserCard'
import { UsersTableRow } from '@components/Users/UsersTableRow'
import { UsersTableHeader } from '@components/Users/UsersTableHeader'
import { cn } from '@utils/cn'
import type { UsersTableProps } from './types'

export const UsersTable: FC<UsersTableProps> = ({
  users,
  hasActiveFilters,
  sortDirection,
  sortField,
  onSort,
  className,
}) => {
  if (users.length === 0) {
    return <UsersEmptyState hasActiveFilters={hasActiveFilters} />
  }

  return (
    <div className={className}>
      <div className="hidden overflow-x-auto md:block">
        <Table className="min-w-full" aria-label="Users">
          <UsersTableHeader
            sortDirection={sortDirection}
            sortField={sortField}
            onSort={onSort}
          />
          <TableBody>
            {users.map((user) => (
              <UsersTableRow
                key={user.id}
                user={user}
              />
            ))}
          </TableBody>
        </Table>
      </div>
      <div className={cn('divide-y divide-border md:hidden')}>
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
          />
        ))}
      </div>
    </div>
  )
}
