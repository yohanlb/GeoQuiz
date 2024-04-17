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
        'bg-gradient-start': '#22262C',
        'bg-gradient-end': '#0F141C',
      },
    },
  },
  plugins: [],
};
export default config;
