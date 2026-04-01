# Component conventions

## File structure
Each component in `ui/` gets its own folder:
```
components/ui/Button/
  index.tsx           # Component + CVA variants
  Button.stories.tsx  # Storybook story
```

## CVA pattern — use this every time
```tsx
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva('base-classes', {
  variants: {
    variant: { primary: '...', secondary: '...', ghost: '...' },
    size: { sm: '...', md: '...', lg: '...' },
  },
  defaultVariants: { variant: 'primary', size: 'md' },
})

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>

export function Button({ variant, size, className, ...props }: Props) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
}
```

## Rules
- Never hardcode variant classes inline — always go through CVA
- Props must be fully typed — no implicit `any`
- `'use client'` on any component using hooks or event handlers
- Interactive components must support keyboard nav and have correct ARIA

## Utility functions
All utilities live in `src/lib/utils.ts` — cookieCreator, deleteCookies, getCookie.
Import as `import { deleteCookies } from '@/lib/utils'`
Never use relative paths — always @/ aliases.