import { useState } from 'react'
import type { FormEvent } from 'react'
import { getNameError } from '@utils/getNameError'
import type { UseUserNameForm } from './types'

export const useUserNameForm: UseUserNameForm = ({
  userId,
  currentName,
  onSave,
}) => {
  const [name, setName] = useState(currentName)
  const [wasSaved, setWasSaved] = useState(false)
  const trimmedName = name.trim()
  const nameError = getNameError({ name: trimmedName })

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (nameError !== null) {
      return
    }

    setWasSaved(onSave({ userId, name: trimmedName }))
  }

  const changeName = (nextName: string) => {
    setName(nextName)
    setWasSaved(false)
  }

  return {
    name,
    trimmedName,
    nameError,
    wasSaved,
    submit,
    changeName,
  }
}
