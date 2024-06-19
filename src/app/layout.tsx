import { NextUIProvider } from '@nextui-org/react';
import dynamic from 'next/dynamic';
import BackgroundGradient from '@components/_commons/BackgroundGradient';
import MetaTags from '@components/_commons/MetaTags';
import NavBar from '@components/_commons/NavBar';
import Footer from '@components/landing/Footer';
import { inter, notoEmoji } from '../lib/utils/font';
import { metadatas } from './metadatas';
import { PHProvider } from './providers';
import './globals.css';

const PostHogPageView = dynamic(() => import('./PostHogPageView'), {
  ssr: false,
});

export const metadata = metadatas;

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
              <Footer />
              <BackgroundGradient />
            </div>
          </NextUIProvider>
        </body>
      </PHProvider>
    </html>
  );
}
