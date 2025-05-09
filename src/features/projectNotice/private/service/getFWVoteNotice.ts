import { request } from '@/utils/clientApi/request';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ProjectAuthMap } from '@/types/data/projectAuth';
import { bigIntToString } from '@/shared/utils/stringUtils';
import { ResponseBody } from '@/types/responseBody';
import { FWVoteReason, VoteData } from '@/types/data/projectVote';

export type FWVoteNoticeDetailData = VoteData & {
  reason: FWVoteReason;
  crewAuth: ProjectAuthMap;
  crewPosition: {
    id: bigint;
    name: string;
  };
  crewProfileImgSrc: string;
  crewNickname: string;
};

export const getFWVoteNotice = async (
  voteId: bigint,
  fwMemberId: bigint,
): Promise<ResponseBody<FWVoteNoticeDetailData>> => {
  const reqUrl = `/api/project/alert/vote/fwithdraw/detail?voteId=${voteId}&fwMemberId=${fwMemberId}`;
  return await request('GET', reqUrl);
};

export const FWVOTE_NOTICE_QUERY_KEY = 'vAlertFWDetailData';

export const useFWVoteNotice = (voteId: bigint, fwCrewId: bigint) => {
  return useSuspenseQuery({
    queryKey: [
      FWVOTE_NOTICE_QUERY_KEY,
      bigIntToString(voteId),
      bigIntToString(fwCrewId),
    ],
    queryFn: () => getFWVoteNotice(voteId, fwCrewId),
  });
};
