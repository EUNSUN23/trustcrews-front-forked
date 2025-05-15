import { ResponseBody } from '@/types/responseBody';
import { request } from '@/utils/clientApi/request';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { Position } from '@/types/data/position';

export const POSITION_LIST_QUERY_KEY = 'positions';

export const getPositionList = async (): Promise<ResponseBody<Position[]>> => {
  return await request('GET', '/api/position');
};

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
