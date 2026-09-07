import type { ParseUserId } from './types'

export const parseUserId: ParseUserId = ({ value }) => {
  if (value === undefined || !/^\d+$/.test(value)) {
    return null
  }

  return Number(value)
}
