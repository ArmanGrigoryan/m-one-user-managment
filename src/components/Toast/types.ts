export interface ToastProps {
  readonly message: string | null
  readonly tone?: 'error' | 'success'
  readonly onClose: () => void
  readonly className?: string
}
