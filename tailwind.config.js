/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        accent: 'var(--color-accent)',
        surface: 'var(--color-surface)',
        'surface-light': 'var(--color-surface-light)',
        'text-muted': 'var(--color-text-muted)',
        border: 'var(--color-border)',
        primary: '#d4af37',
        secondary: '#f4e87c',
      },
      boxShadow: {
        'shadow': 'var(--shadow)',
        'glow': 'var(--shadow-glow)',
        'premium': 'var(--shadow-premium)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%, 100%': { boxShadow: 'var(--shadow-glow)' },
          '50%': { boxShadow: '0 0 30px rgba(245, 158, 11, 0.4)' },
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};