import type { UserNameEdits } from '@api/usersService'

export type UserNameEditsListener = () => void
export type UnsubscribeFromUserNameEdits = () => void

export type SubscribeToUserNameEdits = (
  listener: UserNameEditsListener,
) => UnsubscribeFromUserNameEdits

export type GetUserNameEditsSnapshotResult = UserNameEdits
export type GetUserNameEditsSnapshot = () => GetUserNameEditsSnapshotResult

export interface WriteUserNameEditArgs {
  readonly userId: number
  readonly name: string
}
export type WriteUserNameEditResult = boolean
export type WriteUserNameEdit = (args: WriteUserNameEditArgs) => WriteUserNameEditResult
