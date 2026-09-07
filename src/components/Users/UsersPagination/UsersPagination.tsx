import type { FC } from 'react'
import { Button } from '@components/Button'
import { cn } from '@utils/cn'
import type { UsersPaginationProps } from './types'

export const UsersPagination: FC<UsersPaginationProps> = ({
  page,
  pageCount,
  onPageChange,
  className,
}) => {
  if (pageCount <= 1) {
    return null
  }

  return (
    <div className={cn('flex items-center justify-end gap-2 border-t border-border px-4 py-3', className)}>
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
  )
}
