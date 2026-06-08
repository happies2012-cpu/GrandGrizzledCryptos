import { motion, type HTMLMotionProps } from 'framer-motion'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { ReactNode } from 'react'

type Variant = 'primary' | 'ghost' | 'danger' | 'success' | 'glass'
type Size    = 'sm' | 'md' | 'lg' | 'xl'

interface GlassButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: ReactNode
  variant?: Variant
  size?: Size
  icon?: ReactNode
  iconRight?: ReactNode
  loading?: boolean
  className?: string
}

const variantStyles: Record<Variant, string> = {
  primary: 'bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] text-white border border-[#818cf8]/30 shadow-[0_4px_16px_rgba(99,102,241,0.4)]',
  ghost:   'glass text-[var(--text-primary)] hover:bg-[var(--bg-glass-hover)]',
  danger:  'bg-gradient-to-br from-[#ef4444] to-[#dc2626] text-white border border-red-400/30 shadow-[0_4px_16px_rgba(239,68,68,0.3)]',
  success: 'bg-gradient-to-br from-[#10b981] to-[#059669] text-white border border-emerald-400/30 shadow-[0_4px_16px_rgba(16,185,129,0.3)]',
  glass:   'glass text-[var(--accent)] border-[var(--accent)]/30 hover:bg-[rgba(99,102,241,0.12)]',
}

const sizeStyles: Record<Size, string> = {
  sm:  'px-3 py-1.5 text-xs rounded-lg  gap-1.5',
  md:  'px-4 py-2   text-sm rounded-xl  gap-2',
  lg:  'px-5 py-2.5 text-sm rounded-xl  gap-2',
  xl:  'px-7 py-3.5 text-base rounded-2xl gap-2.5',
}

export function GlassButton({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  loading = false,
  className,
  disabled,
  ...props
}: GlassButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : 1.03 }}
      whileTap={{   scale: disabled || loading ? 1 : 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      className={twMerge(
        clsx(
          'inline-flex items-center justify-center font-semibold',
          'transition-all duration-200 cursor-pointer select-none',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variantStyles[variant],
          sizeStyles[size],
          className,
        ),
      )}
      {...props}
    >
      {loading ? (
        <span
          aria-hidden="true"
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      ) : icon ? (
        <span aria-hidden="true">{icon}</span>
      ) : null}
      {children}
      {iconRight && !loading && <span aria-hidden="true">{iconRight}</span>}
    </motion.button>
  )
}
