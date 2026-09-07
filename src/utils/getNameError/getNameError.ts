import { MINIMUM_NAME_LENGTH } from './constants'
import type { GetNameError } from './types'

export const getNameError: GetNameError = ({ name }) => {
  if (name.length < MINIMUM_NAME_LENGTH) {
    return `Use at least ${MINIMUM_NAME_LENGTH} characters.`
  }

  return null
}
