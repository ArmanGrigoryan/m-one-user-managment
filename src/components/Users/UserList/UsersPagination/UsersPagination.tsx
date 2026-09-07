import type { FC } from 'react'
import { Button } from '@components/design-system/Button'
import { cn } from '@utils/cn'
import type { UsersPaginationProps } from './types'

export const UsersPagination: FC<UsersPaginationProps> = ({
  page,
  pageCount,
  totalCount,
  pageSize,
  onPageChange,
  className,
}) => {
  if (pageCount <= 1) {
    return null
  }

  const rangeStart = (page - 1) * pageSize + 1
  const rangeEnd = Math.min(page * pageSize, totalCount)

  return (
    <div className={cn('flex flex-col items-center gap-3 border-t border-border px-4 py-3 sm:flex-row sm:justify-between', className)}>
      <p className="text-sm text-muted">
        Showing {rangeStart}–{rangeEnd} of {totalCount}
      </p>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </Button>
        <p className="px-2 text-sm text-muted">
          Page {page} of {pageCount}
        </p>
        <Button
          variant="outline"
          disabled={page === pageCount}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
