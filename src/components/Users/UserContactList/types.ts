import type { User } from '@api/usersService'

export interface UserContactListProps {
  readonly user: User
  readonly className?: string
}
