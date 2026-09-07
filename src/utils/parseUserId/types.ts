export interface ParseUserIdArgs {
  readonly value: string | undefined
}
export type ParseUserIdResult = number | null
export type ParseUserId = (args: ParseUserIdArgs) => ParseUserIdResult
