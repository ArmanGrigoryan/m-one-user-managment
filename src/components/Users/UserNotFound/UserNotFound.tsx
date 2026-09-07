import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@components/Button'
import { cn } from '@utils/cn'
import type { UserNotFoundProps } from './types'

export const UserNotFound: FC<UserNotFoundProps> = ({ className }) => {
  const navigate = useNavigate()

  return (
    <div className={cn('rounded-2xl border border-border bg-card px-6 py-12 text-center', className)}>
      <h1 className="text-2xl font-semibold">Person not found</h1>
      <p className="mt-2 text-muted">
        This person may have moved or the link is incorrect.
      </p>
      <Button className="mt-4" onClick={() => navigate('/')}>
        Open directory
      </Button>
    </div>
  )
}
