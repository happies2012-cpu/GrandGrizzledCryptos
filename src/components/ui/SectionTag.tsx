import type { ReactNode } from 'react'

export function SectionTag({ children }: { children: ReactNode }) {
  return (
    <div className="mb-3 inline-block rounded-full border border-[var(--accent)]/25 bg-[var(--accent-glow)] px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-[var(--accent)]">
      {children}
    </div>
  )
}

interface SectionHeaderProps {
  tag: string
  title: string
  sub?: string
}

export function SectionHeader({ tag, title, sub }: SectionHeaderProps) {
  return (
    <div className="mb-12 text-center">
      <SectionTag>{tag}</SectionTag>
      <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl">
        {title}
      </h2>
      {sub && (
        <p className="mx-auto mt-3 max-w-xl text-[var(--text-secondary)]">{sub}</p>
      )}
    </div>
  )
}
