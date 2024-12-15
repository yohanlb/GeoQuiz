'use client';

import { MyQueryClientProvider } from '@lib/QueryClientProvider';
import UserProvider from '@lib/contexts/UserProvider';
import { NextUIProvider } from '@nextui-org/react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <MyQueryClientProvider>
        <NextUIProvider>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </NextUIProvider>
      </MyQueryClientProvider>
    </UserProvider>
  );
}
