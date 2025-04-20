import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { getTechStackListWithCategory } from '@/service/setting/setting';

export const techMapQueryOptions = () => {
  return queryOptions({
    queryKey: ['techStackListWithCategory'],
    staleTime: Infinity,
    gcTime: Infinity,
    queryFn: getTechStackListWithCategory,
  });
};

export const useTechMaps = () => {
  return useSuspenseQuery(techMapQueryOptions());
};
