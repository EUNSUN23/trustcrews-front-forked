import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { ReactNode } from 'react';
import { positionQueryOptions } from '@/service/position/public/getPositionList';
import { techCategoryQueryOptions } from '@/service/techStack/public/getTechStackCategories';
import { techStackMappingsQueryOptions } from '@/service/techStack/public/getTechStackMappings';
import { techListQueryOptions } from '@/service/techStack/public/getTechStackList';

const StaticOptionDataProvider = ({ children }: { children: ReactNode }) => {
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

export default StaticOptionDataProvider;
