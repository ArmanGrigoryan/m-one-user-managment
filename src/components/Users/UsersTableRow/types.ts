import type { User } from '@api/usersService'

export interface UsersTableRowProps {
  readonly user: User
  readonly className?: string
}
