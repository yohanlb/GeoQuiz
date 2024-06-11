import { NextUIProvider } from '@nextui-org/react';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import BackgroundGradient from '@components/_commons/BackgroundGradient';
import MetaTags from '@components/_commons/MetaTags';
import NavBar from '@components/_commons/NavBar';
import { inter, notoEmoji } from '../lib/utils/font';
import { PHProvider } from './providers';
import './globals.css';

const APP_NAME = 'Geo Quiz!';
const APP_DEFAULT_TITLE = 'Geo Quiz! - Country, Capitals, and Flag questions!';
const APP_TITLE_TEMPLATE = '%s - Geo Quiz!';
const APP_DESCRIPTION =
  'Test your geography knowledge with our trivia quiz! Learn about countries, capitals, and flags.';

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: 'summary',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
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
        <body className={`h-dvh`}>
          <PostHogPageView />
          <NextUIProvider className='h-full overflow-y-auto'>
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
