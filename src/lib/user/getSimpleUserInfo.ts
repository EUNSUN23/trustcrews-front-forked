import { request } from '@/lib/clientApi/request';
import { queryOptions, useQuery } from '@tanstack/react-query';
import { ResponseBody, UserBasicInfo } from '@/utils/type';

export const getSimpleUserInfo = async (): Promise<
  ResponseBody<UserBasicInfo>
> => {
  return await request('GET', '/api/user/simple');
};

export const getSimpleUserInfoQueryOptions = () => {
  return queryOptions({
    queryKey: ['simpleUserInfo'],
    queryFn: getSimpleUserInfo,
  });
};

export const useSimpleUserInfo = () => {
  const { data, isPending, isRefetching, isError, isRefetchError } = useQuery(
    getSimpleUserInfoQueryOptions(),
  );

  return {
    data,
    isPreparing: isPending || isRefetching,
    isError: isError || isRefetchError,
  };
};
