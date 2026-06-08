import { clsx } from 'clsx'
import type { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  color?: string
  bg?: string
  className?: string
}

export function Badge({ children, color, bg, className }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-block rounded-full px-3 py-0.5 text-xs font-bold tracking-wide',
        !bg && !color && 'bg-[var(--accent-glow)] text-[var(--accent)]',
        className,
      )}
      style={{
        backgroundColor: bg,
        color,
      }}
    >
      {children}
    </span>
  )
}
