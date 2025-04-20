import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { getPositionList } from '@/service/setting/setting';

export const positionQueryOptions = () => {
  return queryOptions({
    queryKey: ['positions'],
    staleTime: Infinity,
    gcTime: Infinity,
    queryFn: getPositionList,
  });
};

export const usePositionList = () => {
  return useSuspenseQuery(positionQueryOptions());
};
