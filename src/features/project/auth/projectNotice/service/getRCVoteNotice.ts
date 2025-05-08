import { request } from '@/utils/clientApi/request';
import { useSuspenseQuery } from '@tanstack/react-query';
import { VoteData } from '@/features/project/auth/projectVote/types';
import { bigIntToString } from '@/shared/utils/stringUtils';
import { UserProfileInfo } from '@/features/user/service/getUserDetailInfo';

import { ResponseBody } from '@/types/responseBody';

export type RCVoteNoticeDetailData = {
  applicantInfo: Omit<UserProfileInfo, 'userId'> & { userId: bigint };
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
