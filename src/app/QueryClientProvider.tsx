'use client';

import { useState } from 'react';
import {
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
} from '@tanstack/react-query';

type Props = {
  children: React.ReactNode;
};

const conf: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  },
};

export const MyQueryClientProvider = ({ children }: Props) => {
  const [client] = useState(new QueryClient(conf));

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
