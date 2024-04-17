import { Noto_Emoji, Inter } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const notoEmoji = Noto_Emoji({
  subsets: ['emoji'],
  variable: '--font-notoEmoji',
  display: 'swap',
});
