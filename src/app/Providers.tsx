'use client';

import { RecoilRoot } from 'recoil';
import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode } from 'react';
import {
  AuthState,
  AuthStateProvider,
} from '@/features/user/private/contexts/AuthStateContext';

const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000 * 5,
        refetchOnWindowFocus: false,
        retry: 2,
      },
    },
  });
};

let browserQueryClient: QueryClient | undefined = undefined;

const getQueryClient = () => {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
};

type ProvidersProps = {
  children: ReactNode;
  authState: AuthState;
};

const Providers = ({ children, authState }: ProvidersProps) => {
  const queryClient = getQueryClient();

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <AuthStateProvider authState={authState}>{children}</AuthStateProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </RecoilRoot>
  );
};

export default Providers;
