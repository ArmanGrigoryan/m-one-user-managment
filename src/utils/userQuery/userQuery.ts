import type { SortDirection, SortField } from '@api/usersService'
import type { ParseUserQuery, UpdateUserQuery } from './types'

const DEFAULT_SORT_DIRECTION: SortDirection = 'asc'
const DEFAULT_SORT_FIELD: SortField = 'name'
const DEFAULT_PAGE = 1

export const parseUserQuery: ParseUserQuery = ({ searchParams }) => {
  return {
    search: searchParams.get('q') ?? '',
    cities: parseCities(searchParams.get('city')),
    sortDirection: parseSortDirection(searchParams.get('sort')),
    sortBy: parseSortField(searchParams.get('sortBy')),
    page: parsePage(searchParams.get('page')),
  }
}

export const updateUserQuery: UpdateUserQuery = ({ current, values }) => {
  const updated = new URLSearchParams(current)

  Object.entries(values).forEach(([key, value]) => {
    if (
      value.length === 0 ||
      (key === 'page' && value === String(DEFAULT_PAGE)) ||
      (key === 'sort' && value === DEFAULT_SORT_DIRECTION) ||
      (key === 'sortBy' && value === DEFAULT_SORT_FIELD)
    ) {
      updated.delete(key)
      return
    }

    updated.set(key, value)
  })

  return updated
}

const parseCities = (value: string | null): readonly string[] => {
  if (value === null || value.length === 0) {
    return []
  }

  return value.split(',').filter((city) => city.length > 0)
}

const parseSortDirection = (value: string | null): SortDirection => {
  if (value === 'desc') {
    return 'desc'
  }

  return DEFAULT_SORT_DIRECTION
}

const parseSortField = (value: string | null): SortField => {
  if (
    value === 'name' ||
    value === 'email' ||
    value === 'city' ||
    value === 'company'
  ) {
    return value
  }

  return DEFAULT_SORT_FIELD
}

const parsePage = (value: string | null): number => {
  if (value === null || !/^\d+$/.test(value)) {
    return DEFAULT_PAGE
  }

  const page = Number(value)

  if (page < DEFAULT_PAGE) {
    return DEFAULT_PAGE
  }

  return page
}
