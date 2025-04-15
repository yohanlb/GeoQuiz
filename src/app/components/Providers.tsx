'use client';

import { MyQueryClientProvider } from '@lib/QueryClientProvider';
import UserProvider from '@lib/contexts/UserProvider';
import { HeroUIProvider } from "@heroui/react";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <MyQueryClientProvider>
        <HeroUIProvider>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </HeroUIProvider>
      </MyQueryClientProvider>
    </UserProvider>
  );
}
