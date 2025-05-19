import { ResponseBody } from '@/types/responseBody';
import { request } from '@/lib/clientApi/request';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { TechStack } from '@/types/data/techStack';

export const getTechStackList = async (): Promise<
  ResponseBody<TechStack[]>
> => {
  return await request('GET', '/api/setting/tech-stack');
};

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
