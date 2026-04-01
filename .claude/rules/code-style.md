# Code style

## TypeScript

- Strict mode — no `any`, no non-null assertions without a comment explaining why
- Prefer `interface` over `type` for object shapes
- Use `type` for unions, aliases, and VariantProps
- Function declarations with explicit prop types — not `React.FC`

## Imports

- Always use `@/` aliases — no relative `../../` paths
- Barrel imports: `import { Pill } from '@/components/ui'`

## Do not

- Use `useEffect` to sync state — derive it or handle in event handlers
- Use array index as list key if the list can be reordered
- Add `useCallback`/`useMemo` speculatively — only when profiling shows a problem
- Use `React.FC` — use function declarations with explicit prop types

## Patterns established in this codebase

### Thunks
- Always `return rejectWithValue(...)` — never call it without return
- Use ternary: `return rejectWithValue(err instanceof Error ? err.message : 'Unexpected error')`
- No `any` — type all thunk args explicitly

### Components
- Modal content components return JSX directly — never a `{ title, body }` factory
- `Modal.tsx` uses a `MODAL_TITLES` lookup object + conditional rendering, not a factory pattern
- Lazy useState for any browser API: `useState(() => { if (typeof window === 'undefined') return fallback; ... })`

### Forms
- `e: React.FormEvent` not `e: { preventDefault: () => void }`
- `ref.current?.focus()` not `ref.current && ref.current.focus()`