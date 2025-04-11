import { VoteFWReqData } from '@/service/project/vote/type';
import { request } from '@/lib/clientApi/request';

/**
 * 프로젝트 "강제탈퇴" 투표
 * @param reqData
 */
export const voteForProjectFWithdraw = async (reqData: VoteFWReqData) => {
  return await request('POST', '/api/project/vote/fwithdraw', reqData);
};
