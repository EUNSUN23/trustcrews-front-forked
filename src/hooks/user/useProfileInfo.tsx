'use client';

import { useQuery } from '@tanstack/react-query';
import { ProfileInfo, ResponseBody } from '@/utils/type';
import { getUserDetailInfo } from '@/features/user/service/getUserDetailInfo';

export function useProfileInfo() {
  const { data, isFetching } = useQuery<ResponseBody<ProfileInfo>, Error>({
    queryKey: ['profileInfo'],
    queryFn: getUserDetailInfo,
  });

  return { data, isFetching };
}
