import type { User } from '@api/usersService'
import type { UserEditsOnSave } from '@hooks/useUserEdits'

export interface UserDetailsProps {
  readonly user: User
  readonly onSave: UserEditsOnSave
  readonly className?: string
}
