import type { UserNameEdits } from '@api/usersService'
import type { UsersQuery } from '@hooks/useUsers'
import type { UserEditsOnSave, UserEditsOnRemove } from '@hooks/useUserEdits'

export interface LayoutContext {
  readonly usersQuery: UsersQuery
  readonly edits: UserNameEdits
  readonly saveName: UserEditsOnSave
  readonly removeName: UserEditsOnRemove
}
