import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { getTechStackCategoryList } from '@/service/setting/setting';

export const techCategoryQueryOptions = () => {
  return queryOptions({
    queryKey: ['techStackCategoryList'],
    staleTime: Infinity,
    gcTime: Infinity,
    queryFn: getTechStackCategoryList,
  });
};

export const useTechCategories = () => {
  return useSuspenseQuery(techCategoryQueryOptions());
};
