import type { FormEvent } from 'react'
import type { UserEditsOnSave } from '@hooks/useUserEdits'

export interface UseUserNameFormArgs {
  readonly userId: number
  readonly currentName: string
  readonly onSave: UserEditsOnSave
}

export interface UseUserNameFormResult {
  readonly name: string
  readonly trimmedName: string
  readonly isPending: boolean
  readonly submit: (event: FormEvent<HTMLFormElement>) => void
  readonly changeName: (nextName: string) => void
}

export type UseUserNameForm = (args: UseUserNameFormArgs) => UseUserNameFormResult
