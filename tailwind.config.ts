import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        accent: {
          DEFAULT: '#6366f1',
          dark:    '#4f46e5',
          light:   '#818cf8',
          glow:    'rgba(99,102,241,0.35)',
        },
        purple: {
          DEFAULT: '#8b5cf6',
          glow:    'rgba(139,92,246,0.3)',
        },
        cyan: {
          DEFAULT: '#06b6d4',
          glow:    'rgba(6,182,212,0.25)',
        },
      },
      backdropBlur: {
        glass: '16px',
        heavy: '24px',
      },
      boxShadow: {
        glass:    '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
        'glass-light': '0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)',
        glow:     '0 0 24px rgba(99,102,241,0.4)',
        'glow-sm':'0 0 12px rgba(99,102,241,0.3)',
        card:     '0 4px 24px rgba(0,0,0,0.3)',
        'card-light': '0 4px 24px rgba(0,0,0,0.06)',
      },
      animation: {
        'float':         'float 8s ease-in-out infinite',
        'float-slow':    'float 12s ease-in-out infinite',
        'float-fast':    'float 5s ease-in-out infinite',
        'pulse-glow':    'pulseGlow 3s ease-in-out infinite',
        'shimmer':       'shimmer 2s linear infinite',
        'spin-slow':     'spin 20s linear infinite',
        'scan':          'scan 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0) scale(1)' },
          '50%':     { transform: 'translateY(-30px) scale(1.05)' },
        },
        pulseGlow: {
          '0%,100%': { boxShadow: '0 0 12px rgba(99,102,241,0.3)' },
          '50%':     { boxShadow: '0 0 32px rgba(99,102,241,0.7)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        scan: {
          '0%,100%': { transform: 'translateY(-100%)' },
          '50%':     { transform: 'translateY(100%)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'mesh-dark':  'radial-gradient(ellipse at 20% 50%, rgba(99,102,241,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(139,92,246,0.12) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(6,182,212,0.08) 0%, transparent 50%)',
        'mesh-light': 'radial-gradient(ellipse at 20% 50%, rgba(99,102,241,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(139,92,246,0.06) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(6,182,212,0.05) 0%, transparent 50%)',
        'shimmer-gradient': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
      },
    },
  },
  plugins: [],
}

export default config
