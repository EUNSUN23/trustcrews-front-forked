import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactNode } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { HttpError } from '@/shared/utils/HttpError';
import { HttpStatusCode } from 'axios';

const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000 * 5,
        refetchOnWindowFocus: false,
        retry: 2,
      },
      mutations: {
        throwOnError: (error) => {
          return (
            error instanceof HttpError &&
            (error.status === HttpStatusCode.ServiceUnavailable ||
              error.status === HttpStatusCode.InternalServerError ||
              error.status === HttpStatusCode.Unauthorized)
          );
        },
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

const TanStackQueryClientProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default TanStackQueryClientProvider;
