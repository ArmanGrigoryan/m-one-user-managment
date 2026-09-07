export interface GetNameErrorArgs {
  readonly name: string
}
export type GetNameErrorResult = string | null
export type GetNameError = (args: GetNameErrorArgs) => GetNameErrorResult
