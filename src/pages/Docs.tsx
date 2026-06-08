import { motion } from 'framer-motion'
import { GlassCard } from '@/components/ui/GlassCard'
import { GlassButton } from '@/components/ui/GlassButton'
import { SectionHeader } from '@/components/ui/SectionTag'
import { ChevronRight } from 'lucide-react'

type Page = 'home' | 'sandbox' | 'templates' | 'docs'
interface DocsProps { onNavigate: (p: Page) => void }

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.45, ease: 'easeOut' } }),
}

const STEPS = [
  {
    num: '01',
    title: 'Access the Neural Sandbox',
    body: 'Navigate to the Sandbox tab via the primary navigation. You will find 8 industry sectors in the left panel. Each sector activates a domain-specific knowledge graph with 5 curated design themes and 20 pre-configured page modules.',
  },
  {
    num: '02',
    title: 'Select Industry Sector',
    body: 'Click any industry sector node — Healthcare, E-Commerce, Fintech, EdTech, SaaS, Real Estate, Social, or Logistics. The configuration panel updates immediately, loading domain-specific themes, pages, and tagline data.',
  },
  {
    num: '03',
    title: 'Configure Design Theme',
    body: 'Each sector contains 5 professional design themes engineered for that domain. Select a theme pill to activate it. This parameter propagates through the entire specification output, affecting the visual personality of the generated prompt.',
  },
  {
    num: '04',
    title: 'Define Page Scope',
    body: 'All 20 pages are pre-activated. Deactivate modules you don\'t require. Recommended strategy: start with 8–10 core pages, build those to completion, then return to inject additional page modules using iteration prompts.',
  },
  {
    num: '05',
    title: 'Execute Generation Sequence',
    body: 'Click "Generate Prompt" to compile the complete specification. The system assembles your industry, theme, pages, full tech stack, auth protocol, design system, database schema, and production requirements into one coherent directive.',
  },
  {
    num: '06',
    title: 'Deploy to AI Node',
    body: 'Click "Copy Prompt" — the complete specification is transferred to your clipboard. Inject it into any AI assistant (Claude, ChatGPT, Gemini, Grok, etc.). The AI will construct your complete application from the detailed directive.',
  },
  {
    num: '07',
    title: 'Iterate with Protocol Library',
    body: 'After the initial build, use the Templates tab for iteration directives — feature injection, bug patching, visual recalibration, API integration, performance optimization, and deployment configuration.',
  },
  {
    num: '08',
    title: 'Dual Theme System',
    body: 'Toggle between dark and light mode via the moon/sun control in the navigation bar. Your preference is captured in localStorage and persists across sessions. All components, including glassmorphism effects, adapt automatically.',
  },
]

const FAQ = [
  {
    q: 'Do I need technical knowledge to use this?',
    a: 'Negative. This system is designed for zero-knowledge operators. Select an industry, configure parameters, and copy the generated prompt. The AI assistant handles all code generation.',
  },
  {
    q: 'Which AI systems are compatible?',
    a: 'All major AI coding assistants are compatible: Claude (Anthropic), GPT-4/o1 (OpenAI), Gemini (Google), Grok (xAI), and any AI integrated into Replit, Cursor, Windsurf, or similar development environments.',
  },
  {
    q: 'How many pages should I include in the first generation?',
    a: 'Recommended protocol: start with 8–10 critical pages. Get the core system operational before expanding. Use the Templates tab\'s Feature Injection Protocol to add pages incrementally.',
  },
  {
    q: 'Can I customise the generated prompt?',
    a: 'Affirmative. Copy the prompt, then modify specific parameters before injecting into the AI. The prompt is structured for readability — each section is clearly labelled and can be adjusted independently.',
  },
  {
    q: 'What does "production-ready" mean in this context?',
    a: 'The generated specification includes authentication, RBAC, database schema, API design, error handling, security hardening, accessibility standards, performance requirements, and deployment configuration. Zero TODOs, zero placeholders.',
  },
  {
    q: 'What if the AI doesn\'t implement everything?',
    a: 'Use the iteration prompts in the Templates tab. The "Feature Injection Protocol" and "Anomaly Patch" templates are designed for precise follow-up directives. Be specific about what was missed and reference the exact file or component.',
  },
]

export function Docs({ onNavigate }: DocsProps) {
  return (
    <div>
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            tag="System Documentation"
            title="Neural Sandbox Operation Manual"
            sub="Complete directive sequence for generating and deploying AI-built applications."
          />

          {/* Step cards */}
          <div className="mb-20 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                custom={i} variants={fadeUp} initial="hidden" whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
              >
                <GlassCard className="h-full" padding="lg">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] font-black text-white shadow-glow-sm">
                    {step.num}
                  </div>
                  <h3 className="mb-2 font-bold text-[var(--text-primary)]">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{step.body}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* FAQ */}
          <SectionHeader
            tag="FAQ Matrix"
            title="Frequently Asked Queries"
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {FAQ.map((faq, i) => (
              <motion.div
                key={i}
                custom={i} variants={fadeUp} initial="hidden" whileInView="visible"
                viewport={{ once: true }}
              >
                <GlassCard padding="lg" className="h-full">
                  <h4 className="mb-2 font-bold text-[var(--text-primary)]">{faq.q}</h4>
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{faq.a}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="mt-16"
          >
            <GlassCard padding="xl" className="text-center border-[var(--accent)]/20">
              <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[var(--accent)]">
                SYSTEM READY
              </div>
              <h2 className="mb-3 text-2xl font-extrabold text-[var(--text-primary)]">
                Begin Construction Sequence
              </h2>
              <p className="mb-6 text-sm text-[var(--text-secondary)]">
                All documentation consumed. Proceed to the Neural Sandbox to generate your first application specification.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <GlassButton
                  variant="primary" size="lg"
                  iconRight={<ChevronRight size={16} />}
                  onClick={() => onNavigate('sandbox')}
                >
                  Open Neural Sandbox
                </GlassButton>
                <GlassButton variant="ghost" size="lg" onClick={() => onNavigate('templates')}>
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
