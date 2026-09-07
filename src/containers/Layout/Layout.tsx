import type { FC } from 'react'
import { Suspense } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { Users2 } from 'lucide-react'
import { ErrorBoundary } from '@components/ErrorBoundary'
import { RouteLoadingState } from '@components/design-system/RouteLoadingState'
import { cn } from '@utils/cn'
import type { LayoutProps } from './types'

export const Layout: FC<LayoutProps> = ({ className }) => {
  const { pathname } = useLocation()

  return (
    <div className={cn('min-h-screen w-full max-w-full overflow-x-clip lg:grid lg:grid-cols-[240px_minmax(0,1fr)]', className)}>
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
        <main className="min-w-0 max-w-full px-4 py-6 sm:px-6 lg:px-8">
          <ErrorBoundary key={pathname}>
            <Suspense fallback={<RouteLoadingState />}>
              <Outlet />
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>
    </div>
  )
}
