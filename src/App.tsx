import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ThemeProvider } from '@/context/ThemeContext'
import { AnimatedBackground } from '@/components/ui/AnimatedBackground'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Home }      from '@/pages/Home'
import { Sandbox }   from '@/pages/Sandbox'
import { Templates } from '@/pages/Templates'
import { Docs }      from '@/pages/Docs'

type Page = 'home' | 'sandbox' | 'templates' | 'docs'

function ScrollProgress() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      setPct((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[60] h-[3px]"
      style={{
        width: `${pct}%`,
        background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4)',
        transition: 'width 0.05s linear',
      }}
    />
  )
}

function AppContent() {
  const [page, setPage] = useState<Page>('home')

  const navigate = (p: Page) => {
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const pages: Record<Page, React.ReactNode> = {
    home:      <Home      onNavigate={navigate} />,
    sandbox:   <Sandbox />,
    templates: <Templates />,
    docs:      <Docs onNavigate={navigate} />,
  }

  return (
    <div className="relative min-h-screen">
      <ScrollProgress />
      <AnimatedBackground />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar currentPage={page} onNavigate={navigate} />
        <main className="flex-1" id="main-content" tabIndex={-1}>
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{   opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {pages[page]}
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer onNavigate={navigate} />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}
