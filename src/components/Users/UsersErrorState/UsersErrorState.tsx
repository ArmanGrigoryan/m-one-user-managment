import type { FC } from 'react'
import { RefreshCw } from 'lucide-react'
import { Alert } from '@components/Alert'
import { Button } from '@components/Button'
import { cn } from '@utils/cn'
import type { UsersErrorStateProps } from './types'

export const UsersErrorState: FC<UsersErrorStateProps> = ({ message, onRetry, className }) => {
  return (
    <div className={cn('rounded-2xl border border-border bg-card px-6 py-12 text-center', className)}>
      <div className="mx-auto max-w-md space-y-4">
        <Alert>{message}</Alert>
        <h2 className="text-2xl font-semibold">We couldn't open the directory</h2>
        <p className="text-muted">
          Check your connection, then try the request again.
        </p>
        <Button onClick={onRetry}>
          <RefreshCw className="h-4 w-4" />
          Try again
        </Button>
      </div>
    </div>
  )
}
