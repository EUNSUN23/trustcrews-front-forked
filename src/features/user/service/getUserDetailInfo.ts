import { request } from '@/lib/clientApi/request';
import { useSuspenseQuery } from '@tanstack/react-query';
import { PositionItem } from '@/types/position';
import { TechStackItem } from '@/service/setting/setting';

import { ResponseBody } from '@/types/responseBody';
import { TrustGradeName } from '@/types/trustGradeType';

export interface UserProfileInfo {
  userId: bigint | null;
  email: string;
  nickname: string;
  profileImgSrc?: string | null;
  trustScore: number;
  trustGrade: {
    trustGradeId: number | bigint;
    trustGradeName: TrustGradeName;
  };
  position: PositionItem;
  techStacks: TechStackItem[];
  intro?: string;
  projectHistoryTotalCount: number;
  createDate: string;
  updateDate: string;
}

export const getUserDetailInfo = async (): Promise<
  ResponseBody<UserProfileInfo>
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
