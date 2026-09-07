import type { UserNameEdits } from '@api/usersService'
import {
  loadUserNameEdits,
  saveUserNameEdit,
  USER_NAME_EDITS_STORAGE_KEY,
} from '@utils/storage'
import { EMPTY_EDITS } from './constants'
import type {
  GetUserNameEditsSnapshot,
  SubscribeToUserNameEdits,
  UserNameEditsListener,
  WriteUserNameEdit,
} from './types'

const listeners = new Set<UserNameEditsListener>()
let snapshot: UserNameEdits | null = null

const getStorage = (): Storage | null => {
  try {
    return window.localStorage
  } catch {
    return null
  }
}

const emit = () => {
  listeners.forEach((listener) => {
    listener()
  })
}

const handleStorageEvent = (event: StorageEvent) => {
  if (event.key !== null && event.key !== USER_NAME_EDITS_STORAGE_KEY) {
    return
  }

  snapshot = null
  emit()
}

export const subscribeToUserNameEdits: SubscribeToUserNameEdits = (listener) => {
  if (listeners.size === 0) {
    snapshot = null
    window.addEventListener('storage', handleStorageEvent)
  }

  listeners.add(listener)

  return () => {
    listeners.delete(listener)

    if (listeners.size === 0) {
      window.removeEventListener('storage', handleStorageEvent)
    }
  }
}

export const getUserNameEditsSnapshot: GetUserNameEditsSnapshot = () => {
  if (snapshot !== null) {
    return snapshot
  }

  const storage = getStorage()
  snapshot = storage === null ? EMPTY_EDITS : loadUserNameEdits({ storage })

  return snapshot
}

export const writeUserNameEdit: WriteUserNameEdit = ({ userId, name }) => {
  const storage = getStorage()

  if (storage === null) {
    return false
  }

  try {
    snapshot = saveUserNameEdit({ storage, userId, name })
    emit()
    return true
  } catch {
    return false
  }
}
