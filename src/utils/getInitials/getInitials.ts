import type { GetInitials } from './types'

export const getInitials: GetInitials = ({ name }) => {
  return name
    .split(' ')
    .slice(0, 2)
    .map((namePart) => namePart.charAt(0))
    .join('')
    .toLocaleUpperCase()
}
