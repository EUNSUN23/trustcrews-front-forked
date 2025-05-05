import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { getPositionList } from '@/service/setting/setting';

export const POSITION_LIST_QUERY_KEY = 'positions';

export const positionQueryOptions = () => {
  return queryOptions({
    queryKey: [POSITION_LIST_QUERY_KEY],
    staleTime: Infinity,
    gcTime: Infinity,
    queryFn: getPositionList,
  });
};

export const usePositionList = () => {
  return useSuspenseQuery(positionQueryOptions());
};
