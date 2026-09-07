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
  const [isPending, setIsPending] = useState(false)
  const trimmedName = name.trim()

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsPending(true)
    try {
      if (onSave({ userId, name: trimmedName })) {
        toast.success('Name saved locally.')
      }
    } finally {
      setIsPending(false)
    }
  }

  const changeName = (nextName: string) => {
    setName(nextName)
  }

  return {
    name,
    trimmedName,
    isPending,
    submit,
    changeName,
  }
}
