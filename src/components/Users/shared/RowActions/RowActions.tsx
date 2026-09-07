import { memo } from 'react'
import type { FC } from 'react'
import { MoreVertical, Pencil } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@components/design-system/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/design-system/DropdownMenu'
import { cn } from '@utils/cn'
import type { RowActionsProps } from './types'

export const RowActions: FC<RowActionsProps> = memo(({ userId, userName, className }) => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn('h-10 w-10 p-0', className)}
          aria-label={`Actions for ${userName}`}
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link to={`/users/${userId}`}>
            <Pencil className="h-4 w-4" />
            Edit user
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
})
