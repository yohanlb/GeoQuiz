import Footer from '@features/welcome/components/landing/Footer';
import { MyQueryClientProvider } from '@lib/QueryClientProvider';
import UserProvider from '@lib/contexts/UserProvider';
import { metadatas } from '@lib/metadatas';
import { PHProvider } from '@lib/providers';
import { NextUIProvider } from '@nextui-org/react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { inter, notoEmoji } from '@utils/font';
import BackgroundGradient from '@components/global/BackgroundGradient';
import MetaTags from '@components/global/MetaTags';
import NavBar from '@components/global/navbar/NavBar';
import ClientProviders from './components/ClientProviders';
import './globals.css';

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
            <ClientProviders />
            <MyQueryClientProvider>
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
