export interface AlertProps {
  readonly children: string
  readonly tone?: 'error' | 'success'
  readonly className?: string
}
