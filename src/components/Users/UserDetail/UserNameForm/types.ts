import type { UserEditsOnSave } from '@hooks/useUserEdits'

export interface UserNameFormProps {
  readonly userId: number
  readonly currentName: string
  readonly onSave: UserEditsOnSave
  readonly className?: string
}
