import type { FC } from 'react'
import { ArrowDown, ArrowUp } from 'lucide-react'
import { TableHead, TableHeader, TableRow } from '@components/design-system/Table'
import { USERS_TABLE_COLUMNS } from '@components/Users/UserList/UsersTable/constants'
import type { UsersTableHeaderProps } from './types'

export const UsersTableHeader: FC<UsersTableHeaderProps> = ({
  sortDirection,
  sortField,
  onSort,
}) => {
  return (
    <TableHeader>
      <TableRow>
        {USERS_TABLE_COLUMNS.map(({ field, label }) => {
          const isActive = sortField === field
          const nextDirection =
            isActive && sortDirection === 'asc' ? 'desc' : 'asc'
          const SortIcon = sortDirection === 'asc' ? ArrowUp : ArrowDown

          return (
            <TableHead key={field}>
              <button
                type="button"
                aria-label={`Sort by ${label.toLowerCase()}`}
                onClick={() => onSort(field, nextDirection)}
                className="group -ml-2 inline-flex h-8 items-center gap-1 rounded-md px-2 hover:bg-slate-200/70 focus-visible:outline-2 focus-visible:outline-accent"
              >
                {label}
                {isActive && (
                  <SortIcon className="h-3.5 w-3.5 text-accent" />
                )}
              </button>
            </TableHead>
          )
        })}
        <TableHead className="w-10">
          <span className="sr-only">Actions</span>
        </TableHead>
      </TableRow>
    </TableHeader>
  )
}
