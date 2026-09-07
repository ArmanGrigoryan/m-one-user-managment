import type { UserNameEdits } from '@api/usersService'
import { USER_NAME_EDITS_STORAGE_KEY } from './constants'
import type { LoadUserNameEdits, SaveUserNameEdit } from './types'

export const loadUserNameEdits: LoadUserNameEdits = ({ storage }) => {
  try {
    const rawEdits = storage.getItem(USER_NAME_EDITS_STORAGE_KEY)

    if (rawEdits === null) {
      return {}
    }

    const storedValue: unknown = JSON.parse(rawEdits)

    if (!isUserNameEdits(storedValue)) {
      return {}
    }

    return storedValue
  } catch {
    return {}
  }
}

export const saveUserNameEdit: SaveUserNameEdit = ({ storage, userId, name }) => {
  const edits = {
    ...loadUserNameEdits({ storage }),
    [String(userId)]: name,
  }

  storage.setItem(USER_NAME_EDITS_STORAGE_KEY, JSON.stringify(edits))
  return edits
}

function isUserNameEdits(value: unknown): value is UserNameEdits {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false
  }

  return Object.entries(value).every(
    ([userId, name]) => /^\d+$/.test(userId) && typeof name === 'string',
  )
}
