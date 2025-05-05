import { request } from '@/lib/clientApi/request';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ProfileInfo, ResponseBody } from '@/utils/type';

export const getUserDetailInfo = async (): Promise<
  ResponseBody<ProfileInfo>
> => {
  return await request('GET', `/api/user`);
};

export const USER_DETAIL_INFO_QUERY_KEY = 'profileInfo';

export const useUserDetailInfo = () => {
  return useSuspenseQuery({
    queryKey: [USER_DETAIL_INFO_QUERY_KEY],
    queryFn: getUserDetailInfo,
  });
};
