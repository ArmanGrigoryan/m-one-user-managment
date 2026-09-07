export interface GetPeopleLabelArgs {
  readonly resultCount: number
}
export type GetPeopleLabelResult = string
export type GetPeopleLabel = (args: GetPeopleLabelArgs) => GetPeopleLabelResult
