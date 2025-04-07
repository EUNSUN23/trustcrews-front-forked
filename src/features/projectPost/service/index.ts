import { PostInfo, ResponseBody } from '@/utils/type';
import { request, requestWithAuth } from '@/service/request';

/**
 * 게시글 상세조회
 * @param postId
 */
export const getPost = async (
  postId: bigint,
): Promise<ResponseBody<PostInfo>> => {
  return await request('GET', `/api/post?postId=${postId}`);
};

export const changeRecruitmentStatus = async (boardId: bigint) => {
  return await requestWithAuth(
    'PATCH',
    `/api/post/recruitment-status?boardId=${boardId}`,
  );
};