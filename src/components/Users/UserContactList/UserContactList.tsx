import type { FC, ReactNode } from 'react'
import { Building2, Globe, Mail, MapPin, Phone } from 'lucide-react'
import { cn } from '@utils/cn'
import type { UserContactListProps } from './types'

export const UserContactList: FC<UserContactListProps> = ({ user, className }) => {
  return (
    <section className={cn('rounded-2xl border border-border bg-card p-5 sm:p-6', className)}>
      <h2 className="mb-4 text-xl font-semibold">Contact details</h2>
      <div className="divide-y divide-border">
        <ContactRow
          icon={<Mail className="h-4 w-4" />}
          label="Email"
          value={<a href={`mailto:${user.email}`}>{user.email}</a>}
        />
        <ContactRow
          icon={<Phone className="h-4 w-4" />}
          label="Phone"
          value={<a href={`tel:${user.phone}`}>{user.phone}</a>}
        />
        <ContactRow
          icon={<MapPin className="h-4 w-4" />}
          label="Address"
          value={`${user.address.street}, ${user.address.suite}, ${user.address.city} ${user.address.zipcode}`}
        />
        <ContactRow
          icon={<Globe className="h-4 w-4" />}
          label="Website"
          value={
            <a href={`https://${user.website}`} target="_blank" rel="noreferrer">
              {user.website}
            </a>
          }
        />
        <ContactRow
          icon={<Building2 className="h-4 w-4" />}
          label="Company"
          value={`${user.company.name} — ${user.company.catchPhrase}`}
        />
      </div>
    </section>
  )
}

const ContactRow: FC<{
  readonly icon: ReactNode
  readonly label: string
  readonly value: ReactNode
}> = ({ icon, label, value }) => {
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
