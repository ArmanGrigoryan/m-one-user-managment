export interface GetInitialsArgs {
  readonly name: string
}
export type GetInitialsResult = string
export type GetInitials = (args: GetInitialsArgs) => GetInitialsResult
