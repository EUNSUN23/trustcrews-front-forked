import { request } from '@/utils/clientApi/request';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ResponseBody } from '@/types/responseBody';
import { TrustGradeName } from '@/types/data/trustGrade';
import { Position } from '@/types/data/position';
import { TechStack } from '@/types/data/techStack';

export type UserProfileInfo = {
  userId: bigint | null;
  email: string;
  nickname: string;
  profileImgSrc?: string | null;
  trustScore: number;
  trustGrade: {
    trustGradeId: number | bigint;
    trustGradeName: TrustGradeName;
  };
  position: Position;
  techStacks: TechStack[];
  intro?: string;
  projectHistoryTotalCount: number;
  createDate: string;
  updateDate: string;
};

export const getUserDetailInfo = async (): Promise<
  ResponseBody<UserProfileInfo>
> => {
  return await request('GET', `/api/user/profile`);
};

export const USER_DETAIL_INFO_QUERY_KEY = 'profileInfo';

export const useUserDetailInfo = () => {
  return useSuspenseQuery({
    queryKey: [USER_DETAIL_INFO_QUERY_KEY],
    queryFn: getUserDetailInfo,
  });
};
