import type { FC } from 'react'
import { Suspense } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { Users2 } from 'lucide-react'
import { RouteLoadingState } from '@components/RouteLoadingState'
import { StorageErrorToast } from '@components/StorageErrorToast'
import { useUserEdits } from '@hooks/useUserEdits'
import { useUsers } from '@hooks/useUsers'
import type { LayoutContext } from '@hooks/useLayoutContext'
import { cn } from '@utils/cn'
import type { LayoutProps } from './types'

export const Layout: FC<LayoutProps> = ({ className }) => {
  const usersQuery = useUsers()
  const nameEdits = useUserEdits()

  const context: LayoutContext = {
    usersQuery,
    edits: nameEdits.edits,
    saveName: nameEdits.saveName,
    removeName: nameEdits.removeName,
  }

  return (
    <div className={cn('min-h-screen w-full max-w-full overflow-x-hidden lg:grid lg:grid-cols-[240px_minmax(0,1fr)]', className)}>
      <aside className="hidden border-r border-border bg-card px-4 py-5 lg:flex lg:flex-col">
        <p className="px-2 text-lg font-extrabold tracking-tight">m·one</p>
        <nav className="mt-8">
          <p className="px-2 text-xs font-semibold tracking-wide text-muted uppercase">
            Workspace
          </p>
          <NavLink
            to="/"
            className="mt-2 flex h-10 items-center gap-2 rounded-lg bg-accent-foreground px-2 text-sm font-medium text-accent"
          >
            <Users2 className="h-4 w-4" />
            People
          </NavLink>
        </nav>
      </aside>
      <div className="min-w-0 max-w-full">
        <header className="flex h-14 items-center justify-between border-b border-border bg-card px-4 sm:px-6">
          <p className="text-sm text-muted">
            <span className="font-medium text-foreground">People</span>
            <span className="hidden sm:inline"> · Directory</span>
          </p>
          <p className="hidden rounded-full bg-slate-100 px-3 py-1 text-sm text-muted sm:block">
            Local workspace
          </p>
        </header>
        <main className="min-w-0 max-w-full px-4 py-6 sm:px-6 lg:px-8">
          <Suspense fallback={<RouteLoadingState />}>
            <Outlet context={context} />
          </Suspense>
        </main>
      </div>
      <StorageErrorToast
        message={nameEdits.storageError}
        onClose={nameEdits.clearStorageError}
      />
    </div>
  )
}
