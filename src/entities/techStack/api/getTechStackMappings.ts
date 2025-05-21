import { ResponseBody } from '@/types/responseBody';
import { request } from '@/utils/clientApi/request';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { TechStack } from '@/types/data/techStack';

export interface TechStackMapping extends TechStack {
  categories: string[];
}

export const getTechStackMappings = async (): Promise<
  ResponseBody<TechStackMapping[]>
> => {
  return await request('GET', '/api/techStack/mapping');
};

export const techStackMappingsQueryOptions = () => {
  return queryOptions({
    queryKey: ['techStackListWithCategory'],
    staleTime: Infinity,
    gcTime: Infinity,
    queryFn: getTechStackMappings,
  });
};
export const useTechStackMappings = () => {
  return useSuspenseQuery(techStackMappingsQueryOptions());
};
