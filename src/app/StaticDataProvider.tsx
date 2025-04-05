import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { ReactNode } from 'react';
import {
  positionQueryOptions,
  techCategoryQueryOptions,
  techListQueryOptions,
  techMapQueryOptions,
} from '@/utils/tanstackQueryOptions/settingsQuery';

async function StaticDataProvider({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();

  const positions = queryClient.prefetchQuery(positionQueryOptions());

  const techs = queryClient.prefetchQuery(techCategoryQueryOptions());

  const techResponse = queryClient.prefetchQuery(techMapQueryOptions());

  const techStacks = queryClient.prefetchQuery(techListQueryOptions());

  await Promise.all([positions, techs, techResponse, techStacks]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
  );
}

export default StaticDataProvider;
