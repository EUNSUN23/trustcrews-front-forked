import { request } from '@/lib/clientApi/request';
import { PostPublicInfoData, ResponseBody } from '@/utils/type';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { bigIntToString } from '@/utils/common';

export const getPostPublicInfo = async (
  postId: bigint,
): Promise<ResponseBody<PostPublicInfoData>> => {
  return await request('GET', `/api/post/public?postId=${postId}`);
};

export const getPostPublicInfoQueryOptions = (postId: bigint) => {
  return queryOptions({
    queryKey: ['postPublicInfo', bigIntToString(postId)],
    queryFn: () => getPostPublicInfo(postId),
  });
};

export const usePostPublicInfo = (postId: bigint) => {
  return useSuspenseQuery(getPostPublicInfoQueryOptions(postId));
};
