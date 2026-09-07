export interface UsersErrorStateProps {
  readonly message: string
  readonly onRetry: () => void
  readonly isRetrying?: boolean
  readonly className?: string
}
