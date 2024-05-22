import type { Metadata } from 'next';
import NavBar from '@components/_commons/NavBar';
import BackgroundGradient from '@components/_commons/BackgroundGradient';
import { inter, notoEmoji } from '../lib/utils/font';
import { PHProvider } from './providers';
import dynamic from 'next/dynamic';
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
      <meta
        property='og:title'
        content='GeoQuiz - The Ultimate Geography Quiz'
      />
      <meta property='og:type' content='website' />
      <meta property='og:url' content='https://geoquiz.co' />
      <meta
        property='og:image'
        content='https://geoquiz.co/images/og-image.webp'
      />
      <meta
        property='og:description'
        content='Test your geographic knowledge with GeoQuiz. Discover capitals, flags, and much more!'
      />
      <meta property='og:site_name' content='GeoQuiz' />
      <meta property='og:locale' content='en_US' />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content='@GeoQuiz' />
      <meta
        name='twitter:title'
        content='GeoQuiz - The Ultimate Geography Quiz'
      />
      <meta
        name='twitter:description'
        content='Test your geographic knowledge with GeoQuiz. Discover capitals, flags, and much more!'
      />
      <meta
        name='twitter:image'
        content='https://geoquiz.co/images/og-image.webp'
      />

      <PHProvider>
        <body className={`h-dvh  bg-background`}>
          <PostHogPageView />
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
