import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Zap } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { GlassButton } from '@/components/ui/GlassButton'

type Page = 'home' | 'sandbox' | 'templates' | 'docs'

interface NavbarProps {
  currentPage: Page
  onNavigate: (p: Page) => void
}

const NAV_LINKS: { key: Page; label: string }[] = [
  { key: 'home',      label: 'Home' },
  { key: 'sandbox',   label: 'Sandbox' },
  { key: 'templates', label: 'Templates' },
  { key: 'docs',      label: 'Docs' },
]

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleNav = (page: Page) => {
    onNavigate(page)
    setMobileOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        role="navigation"
        aria-label="Main navigation"
        className="sticky top-0 z-50 border-b border-[var(--border)]"
        style={{
          background: 'var(--bg-glass)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-2.5 font-bold text-[var(--text-primary)] transition-opacity hover:opacity-80"
            aria-label="AI App Builder — go to home"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] shadow-[0_0_16px_rgba(99,102,241,0.4)]">
              <Zap size={18} className="text-white" />
            </div>
            <span className="text-[15px] tracking-tight">
              AI App Builder
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 md:flex" role="menubar">
            {NAV_LINKS.map(link => (
              <button
                key={link.key}
                role="menuitem"
                onClick={() => handleNav(link.key)}
                className={[
                  'relative rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200',
                  currentPage === link.key
                    ? 'text-[var(--accent)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-glass-hover)]',
                ].join(' ')}
              >
                {link.label}
                {currentPage === link.key && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-xl bg-[var(--accent-glow)]"
                    style={{ zIndex: -1 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <GlassButton
              variant="primary"
              size="md"
              onClick={() => handleNav('sandbox')}
              className="hidden sm:inline-flex"
            >
              Start Building
            </GlassButton>
            <button
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--bg-glass)] text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-glass-hover)] md:hidden"
              style={{ backdropFilter: 'blur(16px)' }}
              onClick={() => setMobileOpen(o => !o)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{   opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="sticky top-16 z-40 overflow-hidden border-b border-[var(--border)] md:hidden"
            style={{
              background: 'var(--bg-surface)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
            }}
          >
            <div className="flex flex-col gap-1 p-3">
              {NAV_LINKS.map(link => (
                <button
                  key={link.key}
                  onClick={() => handleNav(link.key)}
                  className={[
                    'rounded-xl px-4 py-3 text-left text-sm font-medium transition-all',
                    currentPage === link.key
                      ? 'bg-[var(--accent-glow)] text-[var(--accent)]'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--bg-glass)] hover:text-[var(--text-primary)]',
                  ].join(' ')}
                >
                  {link.label}
                </button>
              ))}
              <GlassButton
                variant="primary"
                size="lg"
                className="mt-1 w-full justify-center"
                onClick={() => handleNav('sandbox')}
              >
                Start Building
              </GlassButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
