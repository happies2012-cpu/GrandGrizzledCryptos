import { motion } from 'framer-motion'
import { useTheme } from '@/context/ThemeContext'

interface Orb {
  size: number
  x: string
  y: string
  color: string
  duration: number
  delay: number
}

const DARK_ORBS: Orb[] = [
  { size: 700, x: '-10%', y: '-15%',  color: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)',   duration: 10, delay: 0 },
  { size: 600, x: '70%',  y: '55%',   color: 'radial-gradient(circle, rgba(139,92,246,0.14) 0%, transparent 70%)',   duration: 13, delay: 2 },
  { size: 500, x: '40%',  y: '25%',   color: 'radial-gradient(circle, rgba(6,182,212,0.10) 0%, transparent 70%)',    duration: 9,  delay: 4 },
  { size: 450, x: '-5%',  y: '65%',   color: 'radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)',   duration: 14, delay: 1 },
  { size: 400, x: '85%',  y: '5%',    color: 'radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 70%)',   duration: 11, delay: 6 },
]

const LIGHT_ORBS: Orb[] = [
  { size: 700, x: '-10%', y: '-15%',  color: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)',  duration: 10, delay: 0 },
  { size: 600, x: '70%',  y: '55%',   color: 'radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)',  duration: 13, delay: 2 },
  { size: 500, x: '40%',  y: '25%',   color: 'radial-gradient(circle, rgba(6,182,212,0.04) 0%, transparent 70%)',   duration: 9,  delay: 4 },
  { size: 450, x: '-5%',  y: '65%',   color: 'radial-gradient(circle, rgba(236,72,153,0.04) 0%, transparent 70%)',  duration: 14, delay: 1 },
  { size: 400, x: '85%',  y: '5%',    color: 'radial-gradient(circle, rgba(245,158,11,0.03) 0%, transparent 70%)',  duration: 11, delay: 6 },
]

export function AnimatedBackground() {
  const { isDark } = useTheme()
  const orbs = isDark ? DARK_ORBS : LIGHT_ORBS

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width:  orb.size,
            height: orb.size,
            left:   orb.x,
            top:    orb.y,
            background: orb.color,
            borderRadius: '50%',
            filter: 'blur(72px)',
          }}
          animate={{
            y:     [0, -28, 0],
            scale: [1, 1.06, 1],
          }}
          transition={{
            duration: orb.duration,
            delay:    orb.delay,
            repeat:   Infinity,
            ease:     'easeInOut',
          }}
        />
      ))}

      {/* Grid overlay — dark mode only */}
      {isDark && (
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      )}
    </div>
  )
}
