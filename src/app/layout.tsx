import type { Metadata } from 'next';
import NavBar from '@components/_commons/NavBar';
import BackgroundGradient from '@components/_commons/BackgroundGradient';
import { inter, notoEmoji } from '../lib/utils/font';
import { PHProvider } from './providers';
import './globals.css';
import PostHogPageView from './PostHogPageView';

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
    <html lang='en' className={`${inter.variable} ${notoEmoji.variable} dark`}>
      <PHProvider>
        <PostHogPageView />
        <body className={`h-dvh  bg-background`}>
          <div className='mx-auto flex h-full max-w-screen-md flex-col'>
            <NavBar />
            <main className='flex-grow'>{children}</main>
            <BackgroundGradient />
          </div>
        </body>
      </PHProvider>
    </html>
  );
}
