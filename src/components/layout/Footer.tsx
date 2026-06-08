import { Zap } from 'lucide-react'

type Page = 'home' | 'sandbox' | 'templates' | 'docs'

interface FooterProps {
  onNavigate: (p: Page) => void
}

export function Footer({ onNavigate }: FooterProps) {
  const nav = (p: Page) => {
    onNavigate(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer
      className="border-t border-[var(--border)]"
      style={{
        background: 'var(--bg-glass)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-3 flex items-center gap-2.5 font-bold text-[var(--text-primary)]">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6]">
                <Zap size={16} className="text-white" />
              </div>
              AI App Builder
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-[var(--text-muted)]">
              Neural-grade AI prompt framework for generating production-ready applications across any industry sector.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="mb-4 text-[11px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
              System Nodes
            </h4>
            <ul className="space-y-2.5">
              {([
                ['home',      'Command Center'],
                ['sandbox',   'Neural Sandbox'],
                ['templates', 'Protocol Library'],
                ['docs',      'System Docs'],
              ] as [Page, string][]).map(([page, label]) => (
                <li key={page}>
                  <button
                    onClick={() => nav(page)}
                    className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)]"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h4 className="mb-4 text-[11px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
              Industry Matrix
            </h4>
            <ul className="space-y-2.5">
              {['Healthcare', 'Fintech', 'EdTech', 'E-Commerce', 'SaaS', 'Real Estate'].map(i => (
                <li key={i}>
                  <button
                    onClick={() => nav('sandbox')}
                    className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)]"
                  >
                    {i}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-4 text-[11px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
              Data Links
            </h4>
            <ul className="space-y-2.5">
              {([
                ['templates', 'Template Archive'],
                ['docs',      'Initialization Guide'],
                ['templates', 'Best Practices'],
                ['docs',      'Pro Directives'],
              ] as [Page, string][]).map(([page, label], i) => (
                <li key={i}>
                  <button
                    onClick={() => nav(page)}
                    className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)]"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[var(--border)] pt-8 sm:flex-row">
          <p className="text-xs text-[var(--text-muted)]">
            © 2026 AI App Builder — Neural Prompt Framework. All systems nominal.
          </p>
          <p className="text-xs font-semibold text-[var(--accent)]">
            SYSTEM STATUS: OPERATIONAL
          </p>
        </div>
      </div>
    </footer>
  )
}
