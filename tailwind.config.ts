import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        emoji: ['var(--font-notoEmoji)'],
      },
      colors: {
        background: '#1E2228',
        accent: '#e0881b',
        'bg-gradient-start': '#22262C',
        'bg-gradient-end': '#0F141C',
      },
      boxShadow: {
        light: '6px 4px 8px 0px rgba(0, 0, 0, 0.2)',
        medium: '12px 8px 8px 0px rgba(0, 0, 0, 0.2)',
        strong: '12px 12px 8px 2px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
};
export default config;
