import { VoteRecruitReqData } from '@/service/project/vote/type';
import { request } from '@/lib/clientApi/request';

/**
 * 프로젝트 "모집" 투표
 * @param reqData
 */
export const voteForProjectRecruit = async (reqData: VoteRecruitReqData) => {
  return await request('POST', '/api/project/vote/recruit', reqData);
};
