import type { User } from '@api/usersService'

export interface UserProfileHeaderProps {
  readonly user: User
  readonly className?: string
}
