import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { getTechStackList } from '@/service/setting/setting';

export const TECH_LIST_QUERY_KEY = 'techStacks';

export const techListQueryOptions = () => {
  return queryOptions({
    queryKey: [TECH_LIST_QUERY_KEY],
    staleTime: Infinity,
    gcTime: Infinity,
    queryFn: getTechStackList,
  });
};

export const useTechStackList = () => {
  return useSuspenseQuery(techListQueryOptions());
};
