import { useState } from 'react'
import type { FormEvent } from 'react'
import { toast } from 'sonner'
import type { UseUserNameForm } from './types'

export const useUserNameForm: UseUserNameForm = ({
  userId,
  currentName,
  onSave,
}) => {
  const [name, setName] = useState(currentName)
  const trimmedName = name.trim()

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (onSave({ userId, name: trimmedName })) {
      toast.success('Name saved locally.')
    }
  }

  const changeName = (nextName: string) => {
    setName(nextName)
  }

  return {
    name,
    trimmedName,
    submit,
    changeName,
  }
}
