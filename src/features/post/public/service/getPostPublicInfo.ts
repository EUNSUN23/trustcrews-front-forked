import { request } from '@/lib/clientApi/request';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { bigIntToString } from '@/shared/utils/stringUtils';
import { Position } from '@/types/position';
import { ResponseBody } from '@/types/responseBody';

// todo - dataType, api명 ~detail로 수정
export type PostPublicInfoData = {
  boardId: bigint;
  projectId: bigint;
  title: string;
  content: string;
  pageView: number;
  recruitmentStatus: boolean;
  user: {
    userId: bigint;
    nickName: string;
    userProfileImgSrc: string | null;
  };
  contact: string;
  createDate: string;
  updateDate: string;
  boardPositions: {
    boardPositionId: bigint | number;
    position: Position;
  }[];
};

export const getPostPublicInfo = async (
  postId: bigint,
): Promise<ResponseBody<PostPublicInfoData>> => {
  return await request('GET', `/api/post/public?postId=${postId}`);
};

export const POST_PUBLIC_INFO_QUERY_KEY = 'postPublicInfo';

export const getPostPublicInfoQueryOptions = (postId: bigint) => {
  return queryOptions({
    queryKey: [POST_PUBLIC_INFO_QUERY_KEY, bigIntToString(postId)],
    queryFn: () => getPostPublicInfo(postId),
  });
};

export const usePostPublicInfo = (postId: bigint) => {
  return useSuspenseQuery(getPostPublicInfoQueryOptions(postId));
};
