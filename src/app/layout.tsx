import { NextUIProvider } from '@nextui-org/react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import UserProvider from '@utils/contexts/UserProvider';
import { inter, notoEmoji } from '@utils/font';
import dynamic from 'next/dynamic';
import BackgroundGradient from '@components/_commons/BackgroundGradient';
import MetaTags from '@components/_commons/MetaTags';
import NavBar from '@components/_commons/navbar/NavBar';
import Footer from '@components/landing/Footer';
import { MyQueryClientProvider } from './QueryClientProvider';
import { metadatas } from './metadatas';
import { PHProvider } from './providers';
import './globals.css';

const PostHogPageView = dynamic(() => import('./PostHogPageView'), {
  ssr: false,
});

const TrackUserVisit = dynamic(() => import('@hooks/useTrackUserVisit'), {
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
          <UserProvider>
            <PostHogPageView />
            <MyQueryClientProvider>
              <TrackUserVisit />
              <NextUIProvider className='h-full overflow-y-auto'>
                <div className='mx-auto flex h-full max-w-screen-md flex-col'>
                  <NavBar />
                  <main className='flex-grow'>{children}</main>
                  <Footer />
                  <BackgroundGradient />
                </div>
              </NextUIProvider>
              <ReactQueryDevtools initialIsOpen={false} />
            </MyQueryClientProvider>
          </UserProvider>
        </body>
      </PHProvider>
    </html>
  );
}
