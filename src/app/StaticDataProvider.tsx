import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { ReactNode } from 'react';
import { positionQueryOptions } from '@/service/getPositionList';
import { techCategoryQueryOptions } from '@/service/techStack/getTechStackCategories';
import { techStackMappingsQueryOptions } from '@/service/techStack/getTechStackMappings';
import { techListQueryOptions } from '@/service/techStack/getTechStackList';

const StaticDataProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();

  queryClient.prefetchQuery(positionQueryOptions());

  queryClient.prefetchQuery(techCategoryQueryOptions());

  queryClient.prefetchQuery(techStackMappingsQueryOptions());

  queryClient.prefetchQuery(techListQueryOptions());

  const dehydratedState = dehydrate(queryClient, {
    shouldDehydrateQuery: (query) =>
      query.queryKey[0] === positionQueryOptions().queryKey ||
      query.queryKey[0] === techCategoryQueryOptions().queryKey ||
      query.queryKey[0] === techStackMappingsQueryOptions().queryKey ||
      query.queryKey[0] === techListQueryOptions().queryKey,
    shouldRedactErrors: () => {
      return false;
    },
  });

  return (
    <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
  );
};

export default StaticDataProvider;
