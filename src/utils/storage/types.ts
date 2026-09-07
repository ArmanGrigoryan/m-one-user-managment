import type { UserNameEdits } from '@api/usersService'

export interface LoadUserNameEditsArgs {
  readonly storage: Storage
}
export type LoadUserNameEditsResult = UserNameEdits
export type LoadUserNameEdits = (args: LoadUserNameEditsArgs) => LoadUserNameEditsResult

export interface SaveUserNameEditArgs {
  readonly storage: Storage
  readonly userId: number
  readonly name: string
}
export type SaveUserNameEditResult = UserNameEdits
export type SaveUserNameEdit = (args: SaveUserNameEditArgs) => SaveUserNameEditResult

