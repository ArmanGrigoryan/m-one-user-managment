import type { GetPeopleLabel } from './types'

export const getPeopleLabel: GetPeopleLabel = ({ resultCount }) => {
  if (resultCount === 1) {
    return 'person'
  }

  return 'people'
}
