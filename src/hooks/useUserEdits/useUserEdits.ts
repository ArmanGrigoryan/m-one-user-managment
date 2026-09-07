import { useCallback, useSyncExternalStore } from 'react'
import { toast } from 'sonner'
import {
  getUserNameEditsSnapshot,
  subscribeToUserNameEdits,
  writeUserNameEdit,
} from '@utils/userNameEditsStore'
import type { SaveNameArgs, UseUserEdits } from './types'

export const useUserEdits: UseUserEdits = () => {
  const edits = useSyncExternalStore(
    subscribeToUserNameEdits,
    getUserNameEditsSnapshot,
  )

  const saveName = useCallback(({ userId, name }: SaveNameArgs) => {
    const isSaved = writeUserNameEdit({ userId, name })

    if (!isSaved) {
      toast.error('Your change could not be saved in this browser. Check storage permissions and try again.')
    }

    return isSaved
  }, [])

  return {
    edits,
    saveName,
  }
}
