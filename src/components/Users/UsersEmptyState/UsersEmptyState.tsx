import type { FC } from 'react'
import { cn } from '@utils/cn'
import type { UsersEmptyStateProps } from './types'

const getTitle = (hasActiveFilters: boolean) => {
  if (hasActiveFilters) {
    return 'No people match'
  }

  return 'No people yet'
}

const getDescription = (hasActiveFilters: boolean) => {
  if (hasActiveFilters) {
    return 'Try a different search or choose another city.'
  }

  return 'The directory is empty.'
}

export const UsersEmptyState: FC<UsersEmptyStateProps> = ({ hasActiveFilters, className }) => {
  return (
    <div className={cn('px-4 py-16 text-center', className)}>
      <h2 className="text-xl font-semibold">{getTitle(hasActiveFilters)}</h2>
      <p className="mt-2 text-muted">{getDescription(hasActiveFilters)}</p>
    </div>
  )
}
