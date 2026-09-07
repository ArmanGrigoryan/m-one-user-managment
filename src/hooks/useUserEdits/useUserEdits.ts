import { useCallback, useState } from 'react'
import type { UserNameEdits } from '@api/usersService'
import { loadUserNameEdits, saveUserNameEdit } from '@utils/storage'
import type { SaveNameArgs, UseUserEdits } from './types'

const STORAGE_ERROR_MESSAGE =
  'Your change could not be saved in this browser. Check storage permissions and try again.'

export const useUserEdits: UseUserEdits = () => {
  const [edits, setEdits] = useState<UserNameEdits>(() => loadUserNameEdits({ storage: localStorage }))
  const [storageError, setStorageError] = useState<string | null>(null)

  const saveName = useCallback(({ userId, name }: SaveNameArgs) => {
    try {
      const savedEdits = saveUserNameEdit({
        storage: localStorage,
        userId,
        name,
      })
      setEdits(savedEdits)
      setStorageError(null)
      return true
    } catch {
      setStorageError(STORAGE_ERROR_MESSAGE)
      return false
    }
  }, [])

  const clearStorageError = useCallback(() => {
    setStorageError(null)
  }, [])

  return {
    edits,
    storageError,
    saveName,
    clearStorageError,
  }
}
