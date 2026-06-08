import { motion, type HTMLMotionProps } from 'framer-motion'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
  glowColor?: string
  padding?: 'sm' | 'md' | 'lg' | 'xl' | 'none'
  rounded?: 'md' | 'lg' | 'xl' | '2xl'
}

const paddingMap = {
  none: '',
  sm:   'p-4',
  md:   'p-6',
  lg:   'p-7',
  xl:   'p-8',
}

const roundedMap = {
  md:  'rounded-2xl',
  lg:  'rounded-[20px]',
  xl:  'rounded-[24px]',
  '2xl': 'rounded-[28px]',
}

export function GlassCard({
  children,
  className,
  hover = true,
  glow = false,
  glowColor,
  padding = 'lg',
  rounded = 'lg',
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : undefined}
      className={twMerge(
        clsx(
          'glass-card relative overflow-hidden',
          paddingMap[padding],
          roundedMap[rounded],
          glow && 'shadow-glow',
          className,
        ),
      )}
      style={glowColor ? { boxShadow: `0 8px 32px ${glowColor}` } : undefined}
      {...props}
    >
      {/* Top highlight edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)',
        }}
      />
      {children}
    </motion.div>
  )
}
