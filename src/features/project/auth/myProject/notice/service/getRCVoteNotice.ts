import { ProfileInfo, ResponseBody } from '@/utils/type';
import { request } from '@/lib/clientApi/request';
import { bigIntToString } from '@/utils/common';
import { useSuspenseQuery } from '@tanstack/react-query';
import { VoteData } from '@/features/project/auth/myProject/vote/types';

export type RCVoteNoticeDetailData = {
  applicantInfo: Omit<ProfileInfo, 'userId'> & { userId: bigint };
  voteInfo: VoteData & {
    applicant_id: bigint;
  };
};

export const getRCVoteNotice = async (
  alertId: bigint,
  applyId: bigint,
  voteId: bigint,
): Promise<ResponseBody<RCVoteNoticeDetailData>> => {
  const reqUrl = `/api/project/alert/vote/recruit/detail?alertId=${alertId}&applyId=${applyId}&voteId=${voteId}`;
  return await request('GET', reqUrl);
};

export const RCVOTE_NOTICE_QUERY_KEY = 'vAlertRecruitDetailData';

export const useRecruitNotice = (
  voteId: bigint,
  applyId: bigint,
  alertId: bigint,
) => {
  return useSuspenseQuery({
    queryKey: [
      RCVOTE_NOTICE_QUERY_KEY,
      bigIntToString(voteId),
      bigIntToString(applyId),
      bigIntToString(alertId),
    ],
    queryFn: () => getRCVoteNotice(alertId, applyId, voteId),
  });
};
