# Storial 3.0

## What this is
A book-tracking app rebuilt from storial-2.0 as a portfolio piece targeting a Frontend Engineer III role (Velera).
Demonstrates: Next.js App Router, TypeScript, Redux Toolkit, Tailwind, CVA variant system, Storybook, WCAG accessibility.

## Stack
- **Framework**: Next.js (App Router, not Pages Router)
- **Language**: TypeScript — strict mode, no implicit `any`
- **Styling**: Tailwind CSS + `class-variance-authority` (CVA) for all variant components
- **State**: Redux Toolkit — intentional architectural choice for scalability (explain in interviews)
- **API**: Next.js route handlers (`/app/api/`) — replaces the original Express server
- **DB**: MongoDB via native driver
- **Docs**: Storybook — story required for every component in `components/ui/`

## Repo structure
```
src/
  app/                   # Next.js App Router
    api/                 # Route handlers (books, auth)
    library/             # Library page
    page.tsx             # Home page
  components/
    ui/                  # Primitive components — each needs a Storybook story
    layout/              # Header, Footer, ModeToggle
  store/                 # Redux Toolkit (slices, thunks, StoreProvider)
  hooks/                 # Custom hooks
  lib/                   # db.ts, token.ts, api.ts
  types/                 # Shared TypeScript interfaces
```

## Component conventions
- Every `ui/` component lives in its own folder: `Button/index.tsx` + `Button.stories.tsx`
- Use CVA for any component with more than one visual variant
- Add `'use client'` to any component using hooks, Redux, or event handlers
- Export from barrel files — import paths stay clean

## Key decisions (talk about these in interviews)
- Redux over local state: overkill at this scale, but demonstrates scalable thinking
- Next.js App Router: server-first, SSR, API routes in one project — no separate Express server
- CVA over raw Tailwind conditionals: type-safe variant APIs, composable, Storybook-friendly
- File-based routing replaces react-router: `App.routes.tsx` → folder structure

## Tailwind v4 gotchas (create-next-app installs v4)
- `@tailwind base/components/utilities` → replaced by `@import "tailwindcss"`
- Add `@reference "tailwindcss"` as first line of globals.css to use @apply with variants
- `bg-opacity-75` removed → use `bg-gray-500/75` slash syntax instead
- Custom animations must be defined in globals.css inside `@theme {}`, NOT in tailwind.config.ts
- `keyframes` and `animation` in tailwind.config.ts must be inside `theme.extend`, not `theme`

## Next.js App Router gotchas
- Any component using hooks, Redux, or event handlers needs `'use client'` at the top
- `localStorage` crashes on the server — always guard with `typeof window !== 'undefined'`
  or use a lazy useState initializer: `useState(() => { if (typeof window === 'undefined') return default; ... })`
- Redux Provider must be wrapped in a `'use client'` StoreProvider component
- `<img>` → use `<Image>` from next/image; add `priority` prop for above-the-fold images

## Known patterns to use
- Modal content components return JSX directly — NOT a `{ title, body }` factory object
- All thunk catch blocks must `return rejectWithValue(...)` — missing return = undefined payload
- `rejectWithValue` without `return` silently swallows errors and causes undefined payload crashes
- Avoid `any` in thunks — type updateBookById arg as `IBook & { _id: string }`

## Milestone status
- [x] Next.js scaffold + all files migrated
- [x] Tailwind design tokens (tailwind.config.ts)
- [ ] CVA variant system on Pill, Button, Modal
- [ ] Storybook configured + story per component
- [ ] WCAG audit — ARIA on Modal, Pill, Tooltip
- [ ] Search + filter feature