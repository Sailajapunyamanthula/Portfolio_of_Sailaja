import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#080B12',
          900: '#0A0F1A',
          800: '#0D1322',
          700: '#121A2D',
          600: '#18223A',
        },
        fg: {
          DEFAULT: '#E7ECF5',
          sub: '#A3AEC5',
          mute: '#8793AB',
        },
        cyan: { DEFAULT: '#00E5FF' },
        violet: { DEFAULT: '#8B5CF6' },
      },
      fontFamily: {
        sans: ['Figtree', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['Sora', 'Figtree', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 24px -4px rgba(0,229,255,.35)',
        'glow-violet': '0 0 28px -6px rgba(139,92,246,.5)',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        spin: { to: { transform: 'rotate(360deg)' } },
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'modal-in': {
          from: { opacity: '0', transform: 'translateY(16px) scale(.98)' },
          to: { opacity: '1', transform: 'none' },
        },
        drift: {
          '0%,100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(4%,6%,0) scale(1.08)' },
        },
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        'spin-slow': 'spin 60s linear infinite',
        'spin-slower': 'spin 90s linear infinite reverse',
        'fade-in': 'fade-in .25s ease-out both',
        'modal-in': 'modal-in .35s cubic-bezier(.2,.7,.2,1) both',
        drift: 'drift 22s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
