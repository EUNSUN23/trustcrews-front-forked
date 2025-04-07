import { ProjectPostDetailData, ResponseBody } from '@/utils/type';
import { request } from '@/service/request';

/**
 * 게시글 상세조회
 * @param postId
 */
export const getProjectPostDetail = async (
  postId: bigint,
): Promise<ResponseBody<ProjectPostDetailData>> => {
  return await request('GET', `/api/post?postId=${postId}`);
};
