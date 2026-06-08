import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { GlassButton } from '@/components/ui/GlassButton'
import { SectionHeader } from '@/components/ui/SectionTag'
import { TEMPLATES, TEMPLATE_CATEGORIES, type TemplateCategory } from '@/data/templates'

const DO_LIST = [
  'Specify the exact tech stack and versions',
  'Provide examples and concrete context',
  'Define technical constraints upfront',
  'Enumerate edge cases to handle',
  'Request error handling and loading states explicitly',
  'Specify mobile-first responsive design',
  'Include accessibility requirements',
  'Define data validation rules',
]

const DONT_LIST = [
  "Vague requests like 'make it better'",
  'Request too many features in one prompt',
  'Ignore the existing codebase structure',
  'Skip testing requirements',
  'Forget mobile and tablet users',
  'Overlook security hardening',
  'Neglect error handling scenarios',
  'Omit performance expectations',
]

const FLOW_STEPS = [
  { n: '01', title: 'System Boot',           desc: 'Generate the foundation — core pages, routing, auth, and base components with your chosen stack.' },
  { n: '02', title: 'Anomaly Resolution',    desc: 'Test all flows. Identify and patch all anomalies before injecting new feature modules.' },
  { n: '03', title: 'Feature Injection',     desc: 'Inject one feature module at a time. Verify each node before advancing to the next.' },
  { n: '04', title: 'Visual Calibration',    desc: 'Apply animations, micro-interactions, and visual refinements across all rendered components.' },
  { n: '05', title: 'Performance Tuning',    desc: 'Optimize bundle size, database queries, API response times, and core web vitals.' },
  { n: '06', title: 'Integrity Scan',        desc: 'Unit tests, integration tests, E2E tests, and accessibility audits across all paths.' },
  { n: '07', title: 'Deployment Sequence',   desc: 'Configure CI/CD, environment variables, monitoring, and error tracking for production.' },
  { n: '08', title: 'Neural Monitoring',     desc: 'Track anomalies, performance signals, and user behaviour. Iterate based on live data.' },
]

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.05, duration: 0.4, ease: 'easeOut' },
  }),
}

export function Templates() {
  const [activeTab, setActiveTab]   = useState<TemplateCategory>('initial')
  const [copiedIdx, setCopiedIdx]   = useState<number | null>(null)

  const copy = async (code: string, idx: number) => {
    await navigator.clipboard.writeText(code)
    setCopiedIdx(idx)
    setTimeout(() => setCopiedIdx(null), 2200)
  }

  const items = TEMPLATES[activeTab]

  return (
    <div>
      {/* Templates section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            tag="Protocol Library"
            title="Prompt Template Archive"
            sub="Copy-ready specifications for every development operation."
          />

          {/* Tab bar */}
          <div
            role="tablist"
            aria-label="Template categories"
            className="mb-8 flex flex-wrap gap-2"
          >
            {TEMPLATE_CATEGORIES.map(cat => (
              <button
                key={cat.key}
                role="tab"
                aria-selected={activeTab === cat.key}
                onClick={() => setActiveTab(cat.key)}
                className={[
                  'rounded-xl border px-4 py-2 text-sm font-semibold transition-all',
                  activeTab === cat.key
                    ? 'border-[var(--accent)] bg-[var(--accent)] text-white shadow-[0_4px_12px_var(--accent-glow)]'
                    : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]',
                ].join(' ')}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {items.map((tpl, i) => (
              <motion.div
                key={`${activeTab}-${i}`}
                custom={i} variants={fadeUp} initial="hidden" animate="visible"
              >
                <GlassCard className="flex h-full flex-col" padding="md">
                  {/* Tag */}
                  <span
                    className="mb-3 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest"
                    style={{ background: tpl.tagColor, color: tpl.tagText }}
                  >
                    {tpl.tag}
                  </span>
                  <h3 className="mb-1.5 font-bold text-[var(--text-primary)]">{tpl.name}</h3>
                  <p className="mb-4 text-xs text-[var(--text-secondary)]">{tpl.desc}</p>

                  {/* Code preview */}
                  <div className="relative mb-4 flex-1 overflow-hidden rounded-xl" style={{ maxHeight: 140 }}>
                    <pre className="code-block h-full text-[11px]">{tpl.code}</pre>
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-10 rounded-b-xl"
                      style={{ background: 'linear-gradient(transparent, var(--code-bg))' }}
                    />
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-[var(--text-muted)]">
                      {tpl.code.split('\n').length} lines
                    </span>
                    <GlassButton
                      variant={copiedIdx === i ? 'success' : 'primary'}
                      size="sm"
                      icon={copiedIdx === i ? <Check size={12} /> : <Copy size={12} />}
                      onClick={() => copy(tpl.code, i)}
                    >
                      {copiedIdx === i ? 'Copied!' : 'Copy'}
                    </GlassButton>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section
        className="px-4 py-20 sm:px-6 lg:px-8"
        style={{ background: 'var(--bg-glass)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            tag="Calibration Protocols"
            title="Prompt Engineering Standards"
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            <GlassCard padding="lg">
              <h3 className="mb-4 flex items-center gap-2 font-bold text-emerald-400">
                <span>✅</span> Execute These Directives
              </h3>
              <ul className="space-y-3">
                {DO_LIST.map(item => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-emerald-500/10 text-[10px] font-bold text-emerald-400">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </GlassCard>

            <GlassCard padding="lg">
              <h3 className="mb-4 flex items-center gap-2 font-bold text-red-400">
                <span>❌</span> Avoid These Anomalies
              </h3>
              <ul className="space-y-3">
                {DONT_LIST.map(item => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-red-500/10 text-[10px] font-bold text-red-400">✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </GlassCard>

            <GlassCard padding="lg">
              <h3 className="mb-4 flex items-center gap-2 font-bold text-[var(--accent)]">
                <span>⚡</span> Power Directives
              </h3>
              <ul className="space-y-3">
                {[
                  'Iterate one feature at a time for optimal results',
                  'Share error messages verbatim, not paraphrased',
                  'Provide full file context, not just the problem area',
                  'Reference existing components for design consistency',
                  'Request explanations alongside generated code',
                  'Build the happy path first, then edge cases',
                  'Commit to version control before AI-driven changes',
                  'Test every iteration before adding complexity',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[var(--accent-glow)] text-[10px] font-bold text-[var(--accent)]">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Dev Flow */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            tag="Execution Order"
            title="Iterative Development Matrix"
            sub="The optimal sequence for building production systems with AI assistance."
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FLOW_STEPS.map((step, i) => (
              <motion.div
                key={step.n}
                custom={i} variants={fadeUp} initial="hidden" whileInView="visible"
                viewport={{ once: true }}
              >
                <GlassCard className="h-full text-center" padding="lg">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] font-black text-white shadow-glow-sm">
                    {step.n}
                  </div>
                  <h3 className="mb-2 text-sm font-bold text-[var(--text-primary)]">{step.title}</h3>
                  <p className="text-xs leading-relaxed text-[var(--text-secondary)]">{step.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
