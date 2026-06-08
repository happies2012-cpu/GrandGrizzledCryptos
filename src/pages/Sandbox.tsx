import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Check, RefreshCw, ToggleLeft, ToggleRight } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { GlassButton } from '@/components/ui/GlassButton'
import { SectionHeader } from '@/components/ui/SectionTag'
import { INDUSTRIES, type Industry } from '@/data/industries'

function buildPrompt(ind: Industry, theme: string, pages: string[]): string {
  return `NEURAL BUILD SEQUENCE INITIATED
════════════════════════════════════════════════════

SYSTEM:    ${ind.name.toUpperCase()} APPLICATION
THEME:     ${theme.toUpperCase()}
TAGLINE:   ${ind.tagline}

════════════════════════════════════════════════════
TECH MATRIX (Latest Stable Versions)
════════════════════════════════════════════════════
  Frontend  → React 18 + TypeScript + Tailwind CSS v3
  Backend   → Node.js 20 + Express + PostgreSQL 16
  Auth      → JWT (15m access) + Refresh (7d httpOnly)
  State     → Redux Toolkit + RTK Query
  Forms     → React Hook Form + Zod validation
  Animations→ Framer Motion
  Charts    → Recharts
  Icons     → Lucide React
  Realtime  → Socket.io (WebSocket)

════════════════════════════════════════════════════
DESIGN SYSTEM — ${theme.toUpperCase()}
════════════════════════════════════════════════════
  Style       : Glassmorphism (backdrop-filter blur 16px)
  Dark Mode   : bg #030712, glass rgba(255,255,255,0.04)
  Light Mode  : bg #f1f5f9, glass rgba(255,255,255,0.55)
  Accent      : ${ind.color} (primary) + #8b5cf6 (secondary)
  Border R    : 20px cards / 12px inputs / 999px pills
  Shadow Dark : 0 8px 32px rgba(0,0,0,0.4)
  Shadow Light: 0 8px 32px rgba(0,0,0,0.08)
  Transition  : 0.3s ease theme / 0.2s hover interactions
  Typography  : Inter (UI) + JetBrains Mono (code)
  Theme Toggle: Auto system detect + manual, localStorage

════════════════════════════════════════════════════
PAGE ARCHITECTURE (${pages.length} Nodes)
════════════════════════════════════════════════════
${pages.map((p, i) => `  ${String(i + 1).padStart(2, '0')}. ${p}`).join('\n')}

════════════════════════════════════════════════════
AUTHENTICATION PROTOCOL
════════════════════════════════════════════════════
  Pages   : Login, Signup, Email Verify, Forgot, Reset
  Tokens  : Access JWT (15min) + Refresh (7d, httpOnly cookie)
  Roles   : Admin (full) → Manager (edit) → User (own data)
  Security:
    ✦ Bcrypt password hashing (12 rounds)
    ✦ Rate limit: 5 attempts / 15min / IP
    ✦ Email verification on signup
    ✦ CSRF protection on state-change routes
    ✦ Logout all devices endpoint
    ✦ Session activity log (IP, device, time)

════════════════════════════════════════════════════
CORE DIRECTIVES (Every Page)
════════════════════════════════════════════════════
  ✦ Dark/Light toggle in navbar — persisted localStorage
  ✦ Responsive: 320px (mobile) / 768px (tablet) / 1280px (desktop)
  ✦ Skeleton loaders on all async data fetches
  ✦ Error boundaries with user-facing fallbacks
  ✦ Toast system (success / error / warning / info)
  ✦ Empty states with helpful CTAs
  ✦ Search with 300ms debounce on all list views
  ✦ Sort + filter panels on all data tables
  ✦ Export to CSV + PDF from all list views
  ✦ Full keyboard navigation (Tab / Escape / Enter)
  ✦ ARIA labels on all interactive elements
  ✦ WCAG 2.1 AA accessibility compliance
  ✦ Focus visible ring on all focusable elements
  ✦ Breadcrumb navigation on nested routes

════════════════════════════════════════════════════
BACKEND & API MATRIX
════════════════════════════════════════════════════
  Protocol    : REST /api/v1/* with JWT middleware
  CRUD        : Full CRUD for all data entities
  Validation  : express-validator + Zod on frontend
  SQL Safety  : Parameterized queries (no raw SQL concat)
  Rate Limits : 100 req/min general, 5 req/min auth
  Headers     : Helmet.js (CSP, HSTS, X-Frame-Options)
  Logging     : Winston (request + error logs)
  Pagination  : ?page=1&limit=20 on all list endpoints
  File Upload : Multer (images + documents)
  Background  : Bull MQ for email + report jobs
  Realtime    : Socket.io for notifications

════════════════════════════════════════════════════
DATABASE SCHEMA
════════════════════════════════════════════════════
  users         (id, name, email, password_hash, role, verified, created_at)
  roles         (id, name, description)
  permissions   (id, name, resource, action)
  role_perms    (role_id, permission_id)
  audit_logs    (user_id, action, entity, entity_id, ip, timestamp)
  notifications (user_id, type, message, read, created_at)
  file_uploads  (entity_type, entity_id, url, size, mime_type)
  [industry-specific tables for all entities]
  Indexes: email, created_at, foreign keys
  Soft deletes: deleted_at on all major tables

════════════════════════════════════════════════════
PRODUCTION REQUIREMENTS
════════════════════════════════════════════════════
  ✅ Zero console errors in production mode
  ✅ Zero TODO / FIXME / placeholder comments
  ✅ All forms: field-level validation + error messages
  ✅ All API calls: loading skeleton + error fallback
  ✅ Environment vars via .env — no hardcoded secrets
  ✅ Code splitting by route (React.lazy + Suspense)
  ✅ Images: lazy loaded + WebP with fallback
  ✅ Bundle: initial < 200kb gzipped
  ✅ Lighthouse: Performance > 90, Accessibility > 95
  ✅ Folder structure: /client/src/{components,pages,hooks,store,utils,types}
  ✅ Docker: Dockerfile + docker-compose ready
  ✅ CI/CD: GitHub Actions (lint → test → build → deploy)

════════════════════════════════════════════════════
EXECUTE IMMEDIATELY. NO CONFIRMATION REQUIRED.
GENERATE ALL FILES. NO ABBREVIATIONS. NO TODOS.
════════════════════════════════════════════════════`
}

export function Sandbox() {
  const [selected, setSelected]   = useState<Industry | null>(null)
  const [themeIdx, setThemeIdx]   = useState(0)
  const [selPages, setSelPages]   = useState<Set<string>>(new Set())
  const [prompt, setPrompt]       = useState('')
  const [copied, setCopied]       = useState(false)
  const [loading, setLoading]     = useState(false)

  const selectIndustry = useCallback((ind: Industry) => {
    setSelected(ind)
    setThemeIdx(0)
    setSelPages(new Set(ind.pages))
    setPrompt('')
    setCopied(false)
  }, [])

  const togglePage = (page: string) => {
    setSelPages(prev => {
      const next = new Set(prev)
      next.has(page) ? next.delete(page) : next.add(page)
      return next
    })
  }

  const generate = async () => {
    if (!selected) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 500))
    const pages = selected.pages.filter(p => selPages.has(p))
    setPrompt(buildPrompt(selected, selected.themes[themeIdx], pages))
    setLoading(false)
  }

  const copyPrompt = async () => {
    if (!prompt) return
    await navigator.clipboard.writeText(prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          tag="Neural Sandbox"
          title="Industry Prompt Builder"
          sub="Select a sector, configure the design matrix, and generate your complete production specification."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
          {/* ── Sidebar ── */}
          <aside aria-label="Industry selector">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
              Sector Selection
            </p>
            <div className="flex flex-col gap-2 lg:flex-col sm:flex-row sm:flex-wrap lg:flex-col">
              {INDUSTRIES.map(ind => (
                <motion.button
                  key={ind.key}
                  whileHover={{ x: 3 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => selectIndustry(ind)}
                  aria-pressed={selected?.key === ind.key}
                  className={[
                    'flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all',
                    'backdrop-blur-glass',
                    selected?.key === ind.key
                      ? 'border-[var(--accent)]/40 bg-[var(--accent-glow)] text-[var(--accent)]'
                      : 'border-[var(--border)] bg-[var(--bg-glass)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]',
                  ].join(' ')}
                  style={{ backdropFilter: 'blur(16px)' }}
                >
                  <span className="text-lg" aria-hidden="true">{ind.icon}</span>
                  <span className="flex-1 leading-tight">{ind.name}</span>
                  {selected?.key === ind.key && (
                    <span className="h-2 w-2 rounded-full" style={{ background: ind.color }} aria-hidden="true" />
                  )}
                </motion.button>
              ))}
            </div>
          </aside>

          {/* ── Main ── */}
          <main aria-label="Prompt configuration">
            <AnimatePresence mode="wait">
              {!selected ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                >
                  <GlassCard className="flex flex-col items-center justify-center py-20 text-center" padding="xl">
                    <div className="mb-4 text-6xl">🏗️</div>
                    <h3 className="mb-2 text-lg font-bold text-[var(--text-primary)]">Awaiting Sector Selection</h3>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Select an industry from the left panel to begin configuring your application build sequence.
                    </p>
                  </GlassCard>
                </motion.div>
              ) : (
                <motion.div
                  key={selected.key}
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="space-y-5"
                >
                  {/* Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{selected.icon}</span>
                        <h2 className="text-xl font-bold text-[var(--text-primary)]">{selected.name}</h2>
                      </div>
                      <p className="mt-1 text-xs font-medium uppercase tracking-widest text-[var(--text-muted)]">
                        {selected.tagline} · {selected.themes.length} themes · {selected.pages.length} pages
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {prompt && (
                        <GlassButton
                          variant="ghost" size="md"
                          icon={copied ? <Check size={15} /> : <Copy size={15} />}
                          onClick={copyPrompt}
                          className={copied ? 'text-emerald-400 border-emerald-400/30' : ''}
                        >
                          {copied ? 'Copied!' : 'Copy Prompt'}
                        </GlassButton>
                      )}
                      <GlassButton
                        variant="primary" size="md"
                        icon={loading ? undefined : <RefreshCw size={15} />}
                        loading={loading}
                        onClick={generate}
                      >
                        {prompt ? 'Regenerate' : 'Generate Prompt'}
                      </GlassButton>
                    </div>
                  </div>

                  {/* Themes */}
                  <GlassCard padding="md">
                    <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
                      Design Theme Matrix
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selected.themes.map((t, i) => (
                        <button
                          key={t}
                          aria-pressed={themeIdx === i}
                          onClick={() => setThemeIdx(i)}
                          className={[
                            'rounded-full border px-4 py-1.5 text-xs font-semibold transition-all',
                            themeIdx === i
                              ? 'border-[var(--accent)]/40 bg-[var(--accent-glow)] text-[var(--accent)]'
                              : 'border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]',
                          ].join(' ')}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </GlassCard>

                  {/* Pages */}
                  <GlassCard padding="md">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
                        Page Modules{' '}
                        <span className="text-[var(--accent)]">{selPages.size}/{selected.pages.length}</span>
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelPages(new Set(selected.pages))}
                          className="text-[11px] font-semibold text-[var(--accent)] hover:underline"
                        >
                          <ToggleRight size={13} className="inline mr-1" />All
                        </button>
                        <button
                          onClick={() => setSelPages(new Set())}
                          className="text-[11px] font-semibold text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:underline"
                        >
                          <ToggleLeft size={13} className="inline mr-1" />None
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                      {selected.pages.map((page, i) => (
                        <button
                          key={page}
                          aria-pressed={selPages.has(page)}
                          onClick={() => togglePage(page)}
                          className={[
                            'flex items-center gap-1.5 rounded-xl border px-3 py-2 text-left text-xs font-medium transition-all',
                            selPages.has(page)
                              ? 'border-[var(--accent)]/30 bg-[var(--accent-glow)] text-[var(--accent)]'
                              : 'border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--border-strong)] hover:text-[var(--text-secondary)]',
                          ].join(' ')}
                        >
                          <span
                            className="flex h-4 w-4 shrink-0 items-center justify-center rounded text-[9px] font-bold"
                            style={{ background: selPages.has(page) ? 'var(--accent-glow)' : 'var(--bg-glass)' }}
                          >
                            {i + 1}
                          </span>
                          <span className="truncate">{page}</span>
                        </button>
                      ))}
                    </div>
                  </GlassCard>

                  {/* Prompt output */}
                  <AnimatePresence>
                    {prompt && (
                      <motion.div
                        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      >
                        <GlassCard padding="md">
                          <div className="mb-3 flex items-center justify-between">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
                              Generated Specification
                            </p>
                            <GlassButton
                              variant={copied ? 'success' : 'glass'}
                              size="sm"
                              icon={copied ? <Check size={13} /> : <Copy size={13} />}
                              onClick={copyPrompt}
                            >
                              {copied ? 'Copied!' : 'Copy All'}
                            </GlassButton>
                          </div>
                          <pre className="code-block max-h-[520px] overflow-auto text-[11px] leading-[1.85]">
                            {prompt}
                          </pre>
                        </GlassCard>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  )
}
