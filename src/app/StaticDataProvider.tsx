import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { ReactNode } from 'react';
import { positionQueryOptions } from '@/lib/static/getPositionList';
import { techListQueryOptions } from '@/lib/static/getTechStackList';
import { techCategoryQueryOptions } from '@/lib/static/getTechCategories';
import { techMapQueryOptions } from '@/lib/static/getTechMaps';

function StaticDataProvider({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();

  queryClient.prefetchQuery(positionQueryOptions());

  queryClient.prefetchQuery(techCategoryQueryOptions());

  queryClient.prefetchQuery(techMapQueryOptions());

  queryClient.prefetchQuery(techListQueryOptions());

  const dehydratedState = dehydrate(queryClient, {
    shouldDehydrateQuery: (query) =>
      query.queryKey[0] === positionQueryOptions().queryKey ||
      query.queryKey[0] === techCategoryQueryOptions().queryKey ||
      query.queryKey[0] === techMapQueryOptions().queryKey ||
      query.queryKey[0] === techListQueryOptions().queryKey,
    shouldRedactErrors: () => {
      return false;
    },
  });

  return (
    <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
  );
}

export default StaticDataProvider;
