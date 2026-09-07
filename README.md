# M-One User Management

**Applying for: Senior Frontend Engineer**

Users listed, searchable by name or email, sortable, filterable by city, with a detail view and a name edit that survives a reload.

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run check    # lint + typecheck + build
```

Node 20.19+ (Vite 8). No env vars, no backend, no auth.

## Stack

| Choice | Why |
|---|---|
| **React 19 + TS strict** | Required. Plus `noUnusedLocals`, `verbatimModuleSyntax`, `erasableSyntaxOnly`. |
| **TanStack Query** | Not for caching ten rows — for the *states*. `isPending`/`isError`/`isFetching` drive the skeleton, error panel and retry. |
| **React Router** | List state lives in the URL, so I needed real routing. |
| **Tailwind v4** | No design was given, so the decisions are mine and I wanted them next to the markup. |
| **Radix** (popover, dropdown) | Focus trapping, collision detection, keyboard interaction. Behaviour, not design. |
| **sonner** | Toasts, without building a notification system. |

## Decisions

**Local edits beat server data.** `mergeUserNameEdits` applies stored edits over every server response. An edit is the only intentional act a user performs here, and the server value is a fixture that cannot change — if a refetch silently reverted a name someone just typed, the app would be lying about having saved it. This is right for *this* app and wrong for a real one (see below).

**Storage:** `localStorage['m-one:user-name-edits:v1']` → `{ [userId]: name }`. Versioned key, validated on read.

**Edits are read through `useSyncExternalStore`, not `useState`.** A small module store (`utils/userNameEditsStore`) owns the snapshot and every consumer subscribes to it. That buys three things `useState` cannot: one shared snapshot so two components can never disagree, cross-tab sync via the `storage` event, and a `try/catch` around `window.localStorage` — accessing that property throws outright in Safari with site data blocked, which would otherwise kill the render tree. The snapshot is cached by reference, since returning a fresh object from `getSnapshot` makes React throw.

**List state lives in the URL** (search, cities, sort, page), so reload, deep link and back all work with no duplicate copy in React. Search uses `replace`; filters, sort and page push — typing shouldn't fill the history stack, but changing a filter is a navigation you expect to undo. The detail back button checks `useLocation().key`, not `window.history.length`, which counts the whole browser session rather than this app's own history stack.

**No stale-response race exists here.** The endpoint takes no query params, so I fetch once and filter in memory — no per-keystroke request, so no responses to arrive out of order. I didn't add a debounce to look like I'd solved it. The `signal` is forwarded, so the in-flight request cancels on unmount.

**Scale:** the fixture returns ten rows; `createDemoUsers` clones them to 100, 25 per page. It's a fiction and it's labelled as one in the UI.

## What I checked

- Chrome desktop, DevTools responsive mode
- Tested on Android and iOS

**Core Web Vitals.** Checked with Lighthouse against the production build; no failing metric. **CLS:** a stable scrollbar gutter, skeletons that reserve the row's space, and a non-modal row menu that can't reflow the page. **LCP:** no web fonts, no images, ~100 KB gzip with routes code-split.

## Tests

Omitted deliberately, given the one-day scope.

## Where the requirements contradict themselves

1. **An API that "never fails" can't demonstrate failure handling.** I built the error state and retry, and you can't reach them without going offline — so the most carefully built state is the one you're least likely to see.
2. **The stale-response race presumes a different API.** Racing responses need per-keystroke requests; `/users` takes no parameters and returns all ten at once. I'd have to invent a fake server search, then solve the problem I invented.
3. **"Far more rows than ten" from an endpoint returning exactly ten** can only be satisfied by fabricating data — which contradicts "a shipped app, not a demo". No guidance on how many, either: 100 and 10,000 are different engineering problems.
4. **Local edits must win, but the model that makes them win is out of scope.** Excluding "real persistence" forces browser storage, so "the user's edits" really means "this browser's edits". And the rule only holds while the server is a fixture — against a real backend, "local edit always wins" would mask a colleague's newer change and survive a server correction.

## What building this for real would involve

- **Contract first:** `PATCH /users/:id` with `{ name }`, returning the record. `PATCH` not `PUT` — `PUT` implies the whole resource and lets a stale client wipe fields it never loaded.
- **Optimistic update with rollback,** not local persistence: `onMutate` snapshots the cache and writes immediately, `onError` restores, `onSettled` invalidates `['users']`. That deletes `localStorage`, the merge layer and the who-wins rule entirely.
- **Concurrency via `ETag`/`If-Match`.** A `409` means someone got there first — show both values and let the user choose. That's what "local edit always wins" can never do.
- **The error states a fixture can't produce:** `400`/`422` with the draft preserved, `401` re-auth, `403` disabling the control, `404` deleted underneath you, `429` back-off, `5xx`/offline retry.
- **Returning to the table must show fresh data** — invalidating `['users']` after a save. Note `staleTime: Infinity` is correct only for an immutable fixture; with writes it's a bug.
- **Analytics and error reporting.** Nothing is instrumented today. Client-side error reporting wires into the error boundary's `componentDidCatch`; product analytics on search, filter and edit success/failure rates; and Core Web Vitals collected from real users rather than a single lab run.

## What I would need before building this for real

**Edit model**
- Who else edits these records? If two people can, "local wins" is wrong and I need a concurrency model.
- Should a user be able to revert to the server value? Editing currently destroys the route back.

**Scale and data**
- Realistic row count and growth curve. 100 vs 10,000 vs 1,000,000 are three different applications.
- Search, filtering, sorting and pagination all move server-side — the client holds one page, so sorting it in memory would only sort that page. Cursor/keyset over offset, which drifts. Search per keystroke makes the race in (2) real, answered by cancellation rather than a debounce.

**Users and support**
- Accessibility target? The ARIA is written but unverified — a real target needs a screen-reader pass.
- i18n? Sorting, formatting and text expansion all depend on it and none of it is free retrofitted.

**Product**
- A ticket with clear acceptance criteria — backend contract, frontend behaviour, and Figma from the designer — so everyone is aligned up front, and anything unclear gets discussed in the comments.
