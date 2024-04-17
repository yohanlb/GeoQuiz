import type { Metadata } from 'next';
import NavBar from '@components/_commons/NavBar';
import BackgroundGradient from '@components/_commons/BackgroundGradient';
import { inter, notoEmoji } from '../utils/font';
import './globals.css';

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
    <html lang='en' className={`${inter.variable} ${notoEmoji.variable}`}>
      <body className={`mx-auto max-w-screen-md pb-2`}>
        <NavBar />
        {children}
        <BackgroundGradient />
      </body>
    </html>
  );
}
