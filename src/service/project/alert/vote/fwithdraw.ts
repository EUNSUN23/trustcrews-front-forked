import { VAlertFWDetailData } from '@/service/project/alert/type';
import { ResponseBody } from '@/utils/type';
import { request } from '@/lib/clientApi/request';

/**
 * 프로젝트 투표 알림 상세 조회 - “강제탈퇴”
 * @param voteId
 * @param fwMemberId
 */
export const getVAlertFWDetail = async (
  voteId: bigint,
  fwMemberId: bigint,
): Promise<ResponseBody<VAlertFWDetailData>> => {
  const reqUrl = `/api/project/alert/vote/fwithdraw/detail?voteId=${voteId}&fwMemberId=${fwMemberId}`;
  return await request('GET', reqUrl);
};
