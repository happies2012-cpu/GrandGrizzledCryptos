import { motion } from 'framer-motion'
import {
  Cpu, Layers, Lock, Zap, Globe, BarChart3,
  ChevronRight, Star, Shield, Sparkles,
} from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { GlassButton } from '@/components/ui/GlassButton'
import { SectionHeader } from '@/components/ui/SectionTag'

type Page = 'home' | 'sandbox' | 'templates' | 'docs'
interface HomeProps { onNavigate: (p: Page) => void }

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' } }),
}

const STATS = [
  { value: '8+',   label: 'Industry Sectors' },
  { value: '5',    label: 'Design Themes' },
  { value: '30',   label: 'Pages / App' },
  { value: '100%', label: 'Production Ready' },
]

const FEATURES = [
  {
    icon: <Cpu size={22} />,
    title: 'Industry Intelligence',
    desc: 'Pre-loaded neural frameworks for Healthcare, Fintech, EdTech, E-Commerce, SaaS, Real Estate, Social & Logistics.',
    badge: 'Live',
  },
  {
    icon: <Layers size={22} />,
    title: '5 Design Themes',
    desc: 'Each industry carries 5 curated design themes calibrated to sector-specific user behaviour and workflow patterns.',
  },
  {
    icon: <Globe size={22} />,
    title: '30 Pages Per System',
    desc: 'Complete page-level specifications covering every user flow — from authentication to analytics and beyond.',
    badge: 'New',
  },
  {
    icon: <Sparkles size={22} />,
    title: 'Glassmorphism Engine',
    desc: 'Full dark + light mode specifications with blur effects, layered transparency, and animated micro-interactions.',
    badge: 'Hot',
  },
  {
    icon: <BarChart3 size={22} />,
    title: 'Responsive Grid Matrix',
    desc: 'Mobile-first breakpoint specifications: 320px, 768px, 1280px. Touch-optimised with proper target sizing.',
  },
  {
    icon: <Lock size={22} />,
    title: 'Auth & RBAC Embedded',
    desc: 'Authentication flows, role-based access control, and security hardening specs included in every prompt output.',
  },
  {
    icon: <Zap size={22} />,
    title: 'One-Click Copy Protocol',
    desc: 'Copy the entire specification with a single interaction. Paste into any AI system to begin construction.',
  },
  {
    icon: <Shield size={22} />,
    title: 'Security Specifications',
    desc: 'Rate limiting, CSRF protection, JWT hardening, input sanitization, and SQL injection prevention — all specified.',
  },
  {
    icon: <Star size={22} />,
    title: 'Iterative Expansion',
    desc: 'Template library with prompts for features, UI polish, backend, debugging, and deployment — covering every iteration.',
  },
]

const STEPS = [
  { n: '01', title: 'Select Industry Sector', desc: 'Navigate the neural matrix and select from 8 industry classifications. Each sector activates a domain-specific knowledge graph.' },
  { n: '02', title: 'Configure Design Theme',  desc: 'Choose from 5 professional design themes engineered for your sector. Theme selection recalibrates the entire visual output.' },
  { n: '03', title: 'Define Page Scope',        desc: 'Activate or deactivate individual page modules. Start focused with 5–10 pages, expand as the system scales.' },
  { n: '04', title: 'Generate & Deploy',        desc: 'Execute the generation sequence. Copy the prompt. Inject into any AI node. Receive a complete, production-ready codebase.' },
]

export function Home({ onNavigate }: HomeProps) {
  return (
    <div className="relative">
      {/* ── Hero ── */}
      <section
        aria-labelledby="hero-heading"
        className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-4 py-24 text-center"
      >
        {/* Badge */}
        <motion.div
          custom={0} variants={fadeUp} initial="hidden" animate="visible"
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/20 bg-[var(--accent-glow)] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[var(--accent)]"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent)]" />
          System Initialized — Neural Prompt Framework v2.0
        </motion.div>

        {/* H1 */}
        <motion.h1
          id="hero-heading"
          custom={1} variants={fadeUp} initial="hidden" animate="visible"
          className="mx-auto max-w-4xl text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
        >
          Build Any Industry App
          <br />
          with{' '}
          <span className="gradient-text">AI-Powered Prompts</span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          custom={2} variants={fadeUp} initial="hidden" animate="visible"
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg"
        >
          Select your sector. Configure the design matrix. Generate complete UI specifications
          for 30+ pages — glassmorphism, dark/light mode, auth, backend, all included.
        </motion.p>

        {/* CTA */}
        <motion.div
          custom={3} variants={fadeUp} initial="hidden" animate="visible"
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <GlassButton
            variant="primary" size="xl"
            iconRight={<ChevronRight size={18} />}
            onClick={() => onNavigate('sandbox')}
          >
            Open Neural Sandbox
          </GlassButton>
          <GlassButton
            variant="ghost" size="xl"
            onClick={() => onNavigate('templates')}
          >
            Browse Protocol Library
          </GlassButton>
        </motion.div>

        {/* Stats */}
        <motion.div
          custom={4} variants={fadeUp} initial="hidden" animate="visible"
          className="mt-16 flex flex-wrap items-center justify-center gap-10 sm:gap-14"
        >
          {STATS.map(s => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-black text-[var(--accent)] sm:text-4xl">{s.value}</div>
              <div className="mt-1 text-xs font-medium uppercase tracking-widest text-[var(--text-muted)]">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── Features ── */}
      <section className="px-4 py-24 sm:px-6 lg:px-8" aria-labelledby="features-heading">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            tag="Feature Matrix"
            title="Full-Spectrum Development Tools"
            sub="From zero to production-ready spec in under 60 seconds — every layer covered."
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                custom={i} variants={fadeUp} initial="hidden" whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
              >
                <GlassCard className="h-full" padding="lg">
                  {f.badge && (
                    <span className="absolute right-4 top-4 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                      {f.badge}
                    </span>
                  )}
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--accent)]/20 bg-[var(--accent-glow)] text-[var(--accent)]">
                    {f.icon}
                  </div>
                  <h3 className="mb-2 font-bold text-[var(--text-primary)]">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{f.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section
        className="px-4 py-24 sm:px-6 lg:px-8"
        aria-labelledby="how-heading"
        style={{ background: 'var(--bg-glass)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            tag="Execution Sequence"
            title="Four Steps to System Deployment"
            sub="No prior knowledge required. Select → Configure → Generate → Build."
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.n}
                custom={i} variants={fadeUp} initial="hidden" whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
              >
                <GlassCard className="h-full text-center" padding="lg">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] text-lg font-black text-white shadow-[0_0_20px_rgba(99,102,241,0.4)]">
                    {step.n}
                  </div>
                  <h3 className="mb-2 font-bold text-[var(--text-primary)]">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{step.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
          >
            <GlassCard padding="xl" className="border-[var(--accent)]/20" glowColor="rgba(99,102,241,0.15)">
              <div className="mb-2 text-[11px] font-bold uppercase tracking-widest text-[var(--accent)]">
                AWAITING YOUR COMMAND
              </div>
              <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                Neural Sandbox Ready
              </h2>
              <p className="mb-8 text-[var(--text-secondary)]">
                Open the sandbox, select your industry sector, and generate a complete production-ready application specification in under 60 seconds.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <GlassButton
                  variant="primary" size="xl"
                  iconRight={<ChevronRight size={18} />}
                  onClick={() => onNavigate('sandbox')}
                >
                  Open Neural Sandbox
                </GlassButton>
                <GlassButton variant="ghost" size="xl" onClick={() => onNavigate('templates')}>
                  Protocol Library
                </GlassButton>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
