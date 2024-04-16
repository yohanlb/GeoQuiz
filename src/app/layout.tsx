import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Geo Quiz! - Country, Capitals, and Flag questions!',
  description:
    'Test your geography knowledge with our trivia quiz! Learn about countries, capitals, and flags.',
  keywords:
    'geography, quiz, trivia quiz, country, capitals, flag, questions, learn',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
