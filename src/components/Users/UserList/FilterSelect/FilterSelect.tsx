import type { FC } from 'react'
import { Check, CirclePlus, Search } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'
import { Input } from '@components/design-system/Input'
import { Popover, PopoverContent, PopoverTrigger } from '@components/design-system/Popover'
import { cn } from '@utils/cn'
import type { FilterSelectProps } from './types'

export const FilterSelect: FC<FilterSelectProps> = ({
  label,
  selected,
  options,
  onChange,
  className,
}) => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [draft, setDraft] = useState<readonly string[]>(selected)

  const isActive = open || selected.length > 0

  const filteredOptions = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase()
    if (normalizedSearch.length === 0) {
      return options
    }
    return options.filter((option) =>
      option.toLocaleLowerCase().includes(normalizedSearch),
    )
  }, [options, search])

  const draftSet = useMemo(() => new Set(draft), [draft])
  const allVisibleSelected =
    filteredOptions.length > 0 &&
    filteredOptions.every((option) => draftSet.has(option))

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen)
    if (nextOpen) {
      setDraft(selected)
      setSearch('')
    }
  }

  const toggleOption = useCallback(
    (option: string) => {
      setDraft((prev) =>
        prev.includes(option)
          ? prev.filter((v) => v !== option)
          : [...prev, option],
      )
    },
    [],
  )

  const toggleAll = () => {
    if (allVisibleSelected) {
      setDraft((prev) =>
        prev.filter((v) => !filteredOptions.includes(v)),
      )
    } else {
      setDraft((prev) => [
        ...prev,
        ...filteredOptions.filter((o) => !prev.includes(o)),
      ])
    }
  }

  const apply = () => {
    onChange(draft)
    setOpen(false)
  }

  const reset = () => {
    setDraft([])
  }

  const triggerLabel =
    selected.length === 0
      ? label
      : selected.length === 1
        ? selected[0]
        : `${label} (${selected.length})`

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={label}
          className={cn(
            'flex h-10 items-center gap-1.5 rounded-full border border-dashed px-3 text-sm font-medium transition-colors',
            isActive
              ? 'border-accent text-accent bg-accent/5 hover:bg-accent/10'
              : 'border-border text-foreground hover:border-slate-400 hover:bg-slate-50',
            className,
          )}
        >
          {triggerLabel}
          <CirclePlus className={cn(
            'h-4 w-4',
            isActive ? 'text-accent' : 'text-muted',
          )} />
        </button>
      </PopoverTrigger>
      <PopoverContent className="flex max-h-96 flex-col">
        <div className="border-b border-border p-2">
          <label className="relative block">
            <Search className="pointer-events-none absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2 text-muted" />
            <Input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${label.toLowerCase()}...`}
              className="h-8 pl-8 text-sm"
            />
          </label>
        </div>
        <button
          type="button"
          onClick={toggleAll}
          className="flex items-center gap-3 border-b border-border px-3 py-2.5 text-sm font-medium hover:bg-slate-50"
        >
          <Checkbox checked={allVisibleSelected} />
          Select All
        </button>
        <div className="flex-1 overflow-y-auto">
          {filteredOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => toggleOption(option)}
              className="flex w-full items-center gap-3 px-3 py-2.5 text-sm hover:bg-slate-50"
            >
              <Checkbox checked={draftSet.has(option)} />
              {option}
            </button>
          ))}
          {filteredOptions.length === 0 && (
            <p className="px-3 py-4 text-center text-sm text-muted">
              No results
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 border-t border-border p-2">
          <button
            type="button"
            onClick={apply}
            className="flex-1 rounded-lg bg-accent py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Apply
          </button>
          <button
            type="button"
            onClick={reset}
            className="px-4 py-2 text-sm font-medium text-foreground hover:text-muted"
          >
            Reset
          </button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

const Checkbox: FC<{ readonly checked: boolean }> = ({ checked }) => {
  return (
    <span
      className={cn(
        'flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded border',
        checked
          ? 'border-accent bg-accent text-white'
          : 'border-border bg-card',
      )}
    >
      {checked && <Check className="h-3 w-3" />}
    </span>
  )
}
