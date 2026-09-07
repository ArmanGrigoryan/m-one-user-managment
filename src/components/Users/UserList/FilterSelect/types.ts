export interface CheckboxIconProps {
  readonly checked: boolean
}

export interface FilterSelectProps {
  readonly label: string
  readonly selected: readonly string[]
  readonly options: readonly string[]
  readonly onChange: (selected: readonly string[]) => void
  readonly className?: string
}
