import { request } from '@/utils/clientApi/request';
import { useSuspenseQuery } from '@tanstack/react-query';
import { bigIntToString } from '@/shared/utils/stringUtils';
import { ResponseBody } from '@/types/responseBody';
import { Position } from '@/types/data/position';

export type PostDetailData = {
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

export const getPostDetail = async (
  postId: bigint,
): Promise<ResponseBody<PostDetailData>> => {
  return await request('GET', `/api/post/public?postId=${postId}`);
};

export const POST_DETAIL_QUERY_KEY = 'postDetailInfo';

export const usePostDetail = (postId: bigint) => {
  return useSuspenseQuery({
    queryKey: [POST_DETAIL_QUERY_KEY, bigIntToString(postId)],
    queryFn: () => getPostDetail(postId),
  });
};
