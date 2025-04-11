import { request } from '@/lib/clientApi/request';
import { queryOptions, useQuery } from '@tanstack/react-query';
import { ProfileInfo, ResponseBody } from '@/utils/type';

export const getUserDetailInfo = async (): Promise<
  ResponseBody<ProfileInfo>
> => {
  return await request('GET', `/api/user`);
};

export const getUserDetailInfoQueryOptions = () => {
  return queryOptions({
    queryKey: ['profileInfo'],
    queryFn: getUserDetailInfo,
  });
};

export const useUserDetailInfo = () => {
  const { data, isFetching } = useQuery(getUserDetailInfoQueryOptions());

  return { data, isFetching };
};
