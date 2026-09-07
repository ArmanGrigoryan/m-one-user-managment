import type { SortDirection, SortField } from '@api/usersService'
import type { ParseUserQuery, UpdateUserQuery } from './types'

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
      (key === 'page' && value === '1') ||
      (key === 'sort' && value === 'asc') ||
      (key === 'sortBy' && value === 'name')
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

  return value.split(',')
}

const parseSortDirection = (value: string | null): SortDirection => {
  if (value === 'desc') {
    return 'desc'
  }

  return 'asc'
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

  return 'name'
}

const parsePage = (value: string | null): number => {
  if (value === null || !/^\d+$/.test(value)) {
    return 1
  }

  const page = Number(value)

  if (page < 1) {
    return 1
  }

  return page
}
