export type UsersFiltersOnSearchChange = (value: string) => void
export type UsersFiltersOnCitiesChange = (cities: readonly string[]) => void

export interface UsersFiltersProps {
  readonly search: string
  readonly selectedCities: readonly string[]
  readonly cities: readonly string[]
  readonly resultCount: number
  readonly onSearchChange: UsersFiltersOnSearchChange
  readonly onCitiesChange: UsersFiltersOnCitiesChange
  readonly className?: string
}
