import { useState } from 'react'
import type { SubmitEvent } from 'react'
import { toast } from 'sonner'
import { MAX_USER_NAME_LENGTH } from './constants'
import type { UseUserNameForm } from './types'

export const useUserNameForm: UseUserNameForm = ({
  userId,
  currentName,
  onSave,
}) => {
  const [name, setName] = useState(currentName)
  const trimmedName = name.trim()
  const canSave = trimmedName.length > 0 && trimmedName !== currentName

  const submit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!canSave) {
      return
    }

    if (onSave({ userId, name: trimmedName })) {
      toast.success('Name saved locally.')
    }
  }

  const changeName = (nextName: string) => {
    setName(nextName.slice(0, MAX_USER_NAME_LENGTH))
  }

  return {
    name,
    trimmedName,
    canSave,
    submit,
    changeName,
  }
}
