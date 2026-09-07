import { memo } from 'react'
import type { FC } from 'react'
import { Avatar } from '@components/design-system/Avatar'
import { TableCell, TableRow } from '@components/design-system/Table'
import { RowActions } from '@components/Users/shared/RowActions'
import { getInitials } from '@utils/getInitials'
import type { UsersTableRowProps } from './types'

export const UsersTableRow: FC<UsersTableRowProps> = memo(({ user, className }) => {
  return (
    <TableRow className={className}>
      <TableCell className="max-w-[260px]">
        <div className="flex items-center gap-3">
          <Avatar name={user.name} initials={getInitials({ name: user.name })} />
          <div className="min-w-0">
            <span className="block truncate font-semibold text-foreground">
              {user.name}
            </span>
            <p className="truncate text-xs text-muted">@{user.username}</p>
          </div>
        </div>
      </TableCell>
      <TableCell className="whitespace-nowrap text-muted">{user.email}</TableCell>
      <TableCell className="whitespace-nowrap">{user.address.city}</TableCell>
      <TableCell className="whitespace-nowrap">{user.company.name}</TableCell>
      <TableCell className="text-right">
        <RowActions userId={user.id} userName={user.name} />
      </TableCell>
    </TableRow>
  )
})
