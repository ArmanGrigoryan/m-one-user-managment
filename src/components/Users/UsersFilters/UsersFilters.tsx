import type { FC, ChangeEvent } from 'react'
import { Search } from 'lucide-react'
import { FilterSelect } from '@components/Users/FilterSelect'
import { Input } from '@components/Input'
import { cn } from '@utils/cn'
import type { UsersFiltersProps } from './types'

export const UsersFilters: FC<UsersFiltersProps> = ({
  search,
  selectedCities,
  cities,
  onSearchChange,
  onCitiesChange,
  className,
}) => {
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value)
  }

  return (
    <div className={cn('border-b border-border p-4 sm:p-5', className)}>
      <div className="flex flex-wrap gap-2">
        <label className="relative w-full sm:max-w-80">
          <span className="sr-only">Search by name or email</span>
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted" />
          <Input
            type="search"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search by name or email..."
            className="pl-9"
          />
        </label>
        <FilterSelect
          label="City"
          selected={selectedCities}
          options={cities}
          onChange={onCitiesChange}
        />
      </div>
    </div>
  )
}
