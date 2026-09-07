import type { GetInitials } from './types'

export const getInitials: GetInitials = ({ name }) => {
  if (name.trim().length === 0) {
    return '?'
  }

  return name
    .trim()
    .split(' ')
    .filter((part) => part.length > 0)
    .slice(0, 2)
    .map((namePart) => namePart.charAt(0))
    .join('')
    .toLocaleUpperCase()
}
