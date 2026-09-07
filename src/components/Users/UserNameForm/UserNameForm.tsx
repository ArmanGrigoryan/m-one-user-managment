import type { FC } from 'react'
import { Save } from 'lucide-react'
import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { useUserNameForm } from '@hooks/useUserNameForm'
import { cn } from '@utils/cn'
import type { UserNameFormProps } from './types'

export const UserNameForm: FC<UserNameFormProps> = ({
  userId,
  currentName,
  onSave,
  className,
}) => {
  const form = useUserNameForm({
    userId,
    currentName,
    onSave,
  })

  return (
    <form
      onSubmit={form.submit}
      className={cn('rounded-2xl border border-border bg-card p-5 sm:p-6', className)}
    >
      <h2 className="text-xl font-semibold">Edit name</h2>
      <p className="mt-1 text-sm text-muted">
        Saved only in this browser. Your edit wins over fresh API data.
      </p>
      <label className="mt-4 block" htmlFor="user-name">
        <span className="mb-1.5 block text-sm font-medium">Name</span>
        <Input
          id="user-name"
          value={form.name}
          autoComplete="name"
          aria-label="Name"
          onChange={(event) => {
            form.changeName(event.target.value)
          }}
        />
      </label>
      <div className="mt-4">
        <Button
          type="submit"
          disabled={form.trimmedName === currentName}
        >
          <Save className="h-4 w-4" />
          Save name
        </Button>
      </div>
    </form>
  )
}
