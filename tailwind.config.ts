import type { Config } from 'tailwindcss';

const config = {
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  darkMode: ['class'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        emoji: ['var(--font-notoEmoji)'],
      },
      colors: {
        background: '#1E2228',
        accent: {
          DEFAULT: '#FFB800',
          light: '#FFCA33',
          dark: '#CC9200',
        },
        'bg-gradient-start': '#22262C',
        'bg-gradient-end': '#0F141C',
      },
      boxShadow: {
        light: '6px 4px 8px 0px rgba(0, 0, 0, 0.2)',
        medium: '12px 8px 8px 0px rgba(0, 0, 0, 0.2)',
        strong: '12px 12px 8px 2px rgba(0, 0, 0, 0.3)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
