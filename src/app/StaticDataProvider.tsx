import {
  defaultShouldDehydrateQuery,
  dehydrate,
  HydrationBoundary,
  useQueryClient,
} from '@tanstack/react-query';
import { ReactNode } from 'react';
import {
  positionQueryOptions,
  techCategoryQueryOptions,
  techListQueryOptions,
  techMapQueryOptions,
} from '@/utils/tanstackQueryOptions/settingsQuery';

function StaticDataProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();

  queryClient.prefetchQuery(positionQueryOptions());

  queryClient.prefetchQuery(techCategoryQueryOptions());

  queryClient.prefetchQuery(techMapQueryOptions());

  queryClient.prefetchQuery(techListQueryOptions());

  const dehydratedState = dehydrate(queryClient, {
    shouldDehydrateQuery: (query) =>
      defaultShouldDehydrateQuery(query) || query.state.status === 'pending',
    shouldRedactErrors: (error) => {
      return false;
    },
  });

  return (
    <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
  );
}

export default StaticDataProvider;
