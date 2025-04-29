import { ResponseBody } from '@/utils/type';
import { request } from '@/lib/clientApi/request';
import { useSuspenseQuery } from '@tanstack/react-query';
import { bigIntToString } from '@/utils/common';
import {
  FWVoteReason,
  VoteData,
} from '@/features/project/auth/myProject/vote/types';
import { ProjectAuthMap } from '@/features/project/auth/myProject/global/types/projectAuth';

export type FWVoteNoticeDetailData = VoteData & {
  reason: FWVoteReason;
  fwMemberAuth: ProjectAuthMap;
  fwMemberPosition: {
    id: bigint;
    name: string;
  };
  fwUserProfile: string;
  fwUserNickname: string;
};

export const getFWVoteNotice = async (
  voteId: bigint,
  fwMemberId: bigint,
): Promise<ResponseBody<FWVoteNoticeDetailData>> => {
  const reqUrl = `/api/project/alert/vote/fwithdraw/detail?voteId=${voteId}&fwMemberId=${fwMemberId}`;
  return await request('GET', reqUrl);
};

export const FW_VOTE_NOTICE_QUERY_KEY = 'vAlertFWDetailData';

export const useFWVoteNotice = (voteId: bigint, fwCrewId: bigint) => {
  return useSuspenseQuery({
    queryKey: [
      FW_VOTE_NOTICE_QUERY_KEY,
      bigIntToString(voteId),
      bigIntToString(fwCrewId),
    ],
    queryFn: () => getFWVoteNotice(voteId, fwCrewId),
  });
};
