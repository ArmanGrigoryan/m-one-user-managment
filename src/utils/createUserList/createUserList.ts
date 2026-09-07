import type { SortField, User } from '@api/usersService'
import type { CreateUserList, GetCities, MergeUserNameEdits } from './types'

const getSortValue = (user: User, field: SortField): string => {
  switch (field) {
    case 'name':
      return user.name
    case 'email':
      return user.email
    case 'city':
      return user.address.city
    case 'company':
      return user.company.name
  }
}

export const createUserList: CreateUserList = ({
  users,
  search,
  cities,
  sortDirection,
  sortBy,
}) => {
  const normalizedSearch = search.trim().toLocaleLowerCase()
  const citySet = new Set(cities)
  const visibleUsers = users.filter((user) => {
    const matchesCity = citySet.size === 0 || citySet.has(user.address.city)
    const matchesSearch =
      normalizedSearch.length === 0 ||
      user.name.toLocaleLowerCase().includes(normalizedSearch) ||
      user.email.toLocaleLowerCase().includes(normalizedSearch)

    return matchesCity && matchesSearch
  })

  return visibleUsers.toSorted((firstUser, secondUser) => {
    const comparison = getSortValue(firstUser, sortBy).localeCompare(
      getSortValue(secondUser, sortBy),
    )

    if (sortDirection === 'desc') {
      return -comparison
    }

    return comparison
  })
}

export const mergeUserNameEdits: MergeUserNameEdits = ({ users, edits }) => {
  return users.map((user) => {
    const editedName = edits[String(user.id)]

    if (editedName === undefined) {
      return user
    }

    return { ...user, name: editedName }
  })
}

export const getCities: GetCities = ({ users }) => {
  return [...new Set(users.map(({ address }) => address.city))].toSorted()
}
