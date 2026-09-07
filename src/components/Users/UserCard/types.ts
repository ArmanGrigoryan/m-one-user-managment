import type { User } from '@api/usersService'

export interface UserCardProps {
  readonly user: User
  readonly className?: string
}
