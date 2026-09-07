import type { FC } from 'react'
import { FlaskConical } from 'lucide-react'
import { Badge } from '@components/design-system/Badge'
import { cn } from '@utils/cn'
import type { UsersHeaderProps } from './types'

export const UsersHeader: FC<UsersHeaderProps> = ({ demoUserCount, className }) => {
  return (
    <section className={cn('mb-6 flex min-w-0 max-w-full flex-col gap-3 sm:flex-row sm:items-start sm:justify-between', className)}>
      <div className="min-w-0">
        <h1 className="text-2xl font-bold tracking-tight">User management</h1>
        <p className="mt-2 w-full max-w-2xl whitespace-normal text-sm break-words text-muted">
          Search, filter, sort, and edit people from one focused workspace.
        </p>
      </div>
      <Badge className="w-fit gap-1.5 py-1.5" variant="edited">
        <FlaskConical className="h-3.5 w-3.5" />
        Scale demo · {demoUserCount} generated users
      </Badge>
    </section>
  )
}
