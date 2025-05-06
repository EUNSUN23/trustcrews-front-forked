import { request } from '@/lib/clientApi/request';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ResponseBody, UserBasicInfo } from '@/utils/type';

export const getSimpleUserInfo = async (): Promise<
  ResponseBody<UserBasicInfo>
> => {
  return await request('GET', '/api/user/simple');
};

export const SIMPLE_USER_INFO_QUERY_KEY = 'simpleUserInfo';

export const useSimpleUserInfo = () => {
  return useSuspenseQuery({
    queryKey: [SIMPLE_USER_INFO_QUERY_KEY],
    queryFn: getSimpleUserInfo,
  });
};
