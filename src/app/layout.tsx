import Footer from '@features/welcome/components/landing/Footer';
import { metadatas } from '@lib/metadatas';
import { PHProvider } from '@lib/providers';
import { inter, notoEmoji } from '@utils/font';
import BackgroundGradient from '@components/global/BackgroundGradient';
import MetaTags from '@components/global/MetaTags';
import NavBar from '@components/global/navbar/NavBar';
import ClientProviders from './components/ClientProviders';
import Providers from './components/Providers';
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
          <Providers>
            <ClientProviders />
            <div className='mx-auto flex h-full max-w-screen-md flex-col'>
              <NavBar />
              <main className='flex-grow'>{children}</main>
              <Footer />
              <BackgroundGradient />
            </div>
          </Providers>
        </body>
      </PHProvider>
    </html>
  );
}
