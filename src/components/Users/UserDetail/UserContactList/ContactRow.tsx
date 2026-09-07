import type { FC, ReactNode } from 'react'

export interface ContactRowProps {
  readonly icon: ReactNode
  readonly label: string
  readonly value: ReactNode
}

export const ContactRow: FC<ContactRowProps> = ({ icon, label, value }) => {
  return (
    <div className="flex gap-3 py-3 first:pt-0 last:pb-0">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-foreground text-accent">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-xs text-muted">{label}</p>
        <div className="mt-0.5 break-words text-sm">{value}</div>
      </div>
    </div>
  )
}
