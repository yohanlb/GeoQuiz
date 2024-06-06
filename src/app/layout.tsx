import { NextUIProvider } from '@nextui-org/react';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import BackgroundGradient from '@components/_commons/BackgroundGradient';
import MetaTags from '@components/_commons/MetaTags';
import NavBar from '@components/_commons/NavBar';
import { inter, notoEmoji } from '../lib/utils/font';
import { PHProvider } from './providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'Geo Quiz! - Country, Capitals, and Flag questions!',
  description:
    'Test your geography knowledge with our trivia quiz! Learn about countries, capitals, and flags.',
  keywords:
    'geography, quiz, trivia quiz, country, capitals, flag, questions, learn',
};

const PostHogPageView = dynamic(() => import('./PostHogPageView'), {
  ssr: false,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={`${inter.variable} ${notoEmoji.variable} dark`}>
      <MetaTags />
      <PHProvider>
        <body className={`h-dvh  bg-background`}>
          <PostHogPageView />
          <NextUIProvider className='h-full  overflow-y-auto'>
            <div className='mx-auto flex h-full max-w-screen-md flex-col'>
              <NavBar />
              <main className='flex-grow'>{children}</main>
              <BackgroundGradient />
            </div>
          </NextUIProvider>
        </body>
      </PHProvider>
    </html>
  );
}
