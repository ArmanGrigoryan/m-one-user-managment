import { useCallback, useState } from 'react'
import type { UserNameEdits } from '@api/usersService'
import { toast } from 'sonner'
import { loadUserNameEdits, saveUserNameEdit } from '@utils/storage'
import type { SaveNameArgs, UseUserEdits } from './types'

export const useUserEdits: UseUserEdits = () => {
  const [edits, setEdits] = useState<UserNameEdits>(() => loadUserNameEdits({ storage: localStorage }))

  const saveName = useCallback(({ userId, name }: SaveNameArgs) => {
    try {
      const savedEdits = saveUserNameEdit({
        storage: localStorage,
        userId,
        name,
      })
      setEdits(savedEdits)
      return true
    } catch {
      toast.error('Your change could not be saved in this browser. Check storage permissions and try again.')
      return false
    }
  }, [])

  return {
    edits,
    saveName,
  }
}
