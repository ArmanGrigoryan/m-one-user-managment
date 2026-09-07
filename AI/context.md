# Context brief

Conventions and structure for this codebase. Follow these when adding or changing anything here.

## The project

React 19 + TypeScript (strict) + Vite + Tailwind v4. Data comes from `https://jsonplaceholder.typicode.com/users` — a read-only fixture: ten users, no query parameters, no write endpoints. There is no backend, no auth, no server state to mutate.

```bash
npm run dev
npm run check    # oxlint + tsc -b + vite build — the gate
```

There is no test runner installed.

## Layers

```
src/
  api/         transport + runtime validation of responses
  hooks/       data and behaviour hooks, one folder per hook
  containers/  stateful: wire hooks together, own loading/error/empty states
  components/  presentational: props in, JSX out, no data fetching
  utils/       pure helpers
  routes/      thin route files that render a container
  app/         providers (QueryClient, Toaster, root ErrorBoundary)
```

- **Components must not fetch.** No data hooks in a presentational component — move fetching or global state into a container or a hook.
- **Containers own loading / error / empty states** and render presentational components, using early returns with one branch each.
- **Route files stay thin** — they render a container and nothing else.

## Folder per unit

Every component, container, hook and utility lives in its own folder named exactly like the thing it exports — PascalCase for components and containers, camelCase for hooks and utils.

```
ComponentName/              useSomething/           functionName/
  index.ts                    index.ts                index.ts
  types.ts                    types.ts                types.ts
  constants.ts (optional)     constants.ts            constants.ts
  ComponentName.tsx           useSomething.ts         functionName.ts
```

- `index.ts` contains re-exports and nothing else.
- Exported or non-trivial types go in `types.ts`, never inline in the implementation file.
- Magic strings and numbers, maps and config go in `constants.ts`. **Values never live in `types.ts`.**
- Sub-components used by only one component nest inside that component's folder (`UserContactList/ContactRow/`).
- Related families get a grouping folder (`components/Users/UserList/`, `components/design-system/`).

```ts
// index.ts
export { ComponentName } from './ComponentName'
export type { ComponentNameProps } from './types'
```

## Function type convention

Every non-trivial function gets an `Args` / `Result` / callable-type triple in `types.ts`, and the implementation is annotated with the callable type — not with inline parameter types.

```ts
// types.ts
export interface GetThingArgs {
  readonly id: number
}
export type GetThingResult = string
export type GetThing = (args: GetThingArgs) => GetThingResult
```

```ts
// getThing.ts
import type { GetThing } from './types'

export const getThing: GetThing = ({ id }) => { … }
```

- **Functions take a single destructured object argument**, not positional parameters — `fn({ users, edits })`, not `fn(users, edits)`.
- Hooks follow the same triple: `UseThingArgs` / `UseThingResult` / `UseThing`.
- Callback props get their own named types too, never an inline `(v: X) => void` inside a props interface.

## Components

- Arrow functions typed with `FC<Props>`. Props interface is `<ComponentName>Props`, lives in `types.ts`, fields `readonly`.
- Any component rendering a root element accepts an optional `className?: string` and merges it **last** through `cn()` so callers can position it.
- `cn()` is `twMerge(clsx(...))` — it resolves conflicting Tailwind utilities, so a passed `className` wins over the base.
- Wrapper components around native elements extend the native props (`InputHTMLAttributes<HTMLInputElement>`), destructure `{ className, ...props }` and spread `{...props}` onto the element.
- Named exports everywhere. Default exports only where a framework forces it — lazy route modules and `App`.

## Hook order inside a component

1. Types
2. Constants
3. Refs
4. State
5. `useCallback`
6. `useMemo`
7. Helper functions
8. `useEffect`
9. Return

`useEffect` sits last, right before the return, to signal that it performs side effects.

Compose small single-purpose hooks into a larger one rather than writing one hook with flags. Split any hook doing two unrelated things.

## Naming

- Descriptive, no abbreviations.
- Booleans read as sentences: `isPending`, `hasActiveFilters`, `allVisibleSelected`.
- Handler props are `onSomething`; local handlers are `handleSomething`.
- Constants are `SCREAMING_SNAKE_CASE`, `as const` where the literal type matters.
- Types and interfaces are PascalCase — no `I` or `T` prefix.

## TypeScript

- Never `any`. Use `unknown` plus narrowing.
- `interface` for object shapes; `type` for unions, aliases and function types.
- Derive rather than duplicate: `keyof typeof`, `Omit<User, 'id'>`, `Partial<User>`.
- `verbatimModuleSyntax` is on — type-only imports **must** be `import type`.
- `erasableSyntaxOnly` is on — **no enums, no constructor parameter properties**; they fail the build.
- Strict settings on: `strict`, `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`.

## Imports and aliases

Use path aliases, never deep relative imports. They are mirrored in `vite.config.ts` and `tsconfig.app.json`:

```
@/*  @api/*  @hooks/*  @utils/*  @components/*  @containers/*
```

Import through a folder's `index.ts`, not its implementation file — `@components/Users/UserList/UsersTable`, never `.../UsersTable/UsersTable`.

Import order: external packages → aliased internal modules → relative (`./constants`, `./types`).

## State model

| State | Lives in |
|---|---|
| search, cities, sort, page | **URL query params** — never mirrored into `useState` |
| server users | React Query, key `['users']` |
| name edits | `localStorage` via `utils/userNameEditsStore`, read with `useSyncExternalStore` |
| ephemeral UI (popover open, form draft) | local `useState` |

Data flows one way: `useUsers` (server) + `useUserEdits` (local) → merged in a container → `useUserListState` derives the filtered, sorted, paged view from the URL → presentational components.

Never access `window.localStorage` directly — it throws when a browser blocks site data. Go through `userNameEditsStore`, which wraps the access.

## Code style

- Pure functions where possible.
- Early returns; avoid nested conditionals and `else` after `return`.
- Small, focused components — split anything doing more than one job.
- No unnecessary abstractions: no wrapper, factory or generic with exactly one use and no clear second one.
- No comments unless something is genuinely non-obvious. The codebase is deliberately comment-free.

## Principles

KISS, DRY, SOLID, YAGNI. In practice here: the simplest thing that works, no duplicated logic, one responsibility per module, and nothing built for a requirement that does not exist yet.
