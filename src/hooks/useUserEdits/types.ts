import type { UserNameEdits } from '@api/usersService'

export interface SaveNameArgs {
  readonly userId: number
  readonly name: string
}

export type UserEditsOnSave = (args: SaveNameArgs) => boolean

export interface UseUserEditsResult {
  readonly edits: UserNameEdits
  readonly saveName: UserEditsOnSave
}

export type UseUserEdits = () => UseUserEditsResult
