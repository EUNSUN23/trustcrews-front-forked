import { VoteOption } from '@/service/project/vote/constant';
import { ProjectAuthCode } from '@/features/project/auth/myProject/global/types/projectAuth';

export type VoteOptionCode = keyof typeof VoteOption;
export type VoteOptionType = (typeof VoteOption)[VoteOptionCode];

export type VoteRecruitReqData = {
  voteId: bigint;
  applyId: bigint;
  authMap: ProjectAuthCode;
  answer: VoteOptionCode;
};

export type VoteFWReqData = {
  projectId: bigint;
  voteId: bigint;
  fw_member_id: bigint;
  fw_member_auth: ProjectAuthCode;
  authMap: ProjectAuthCode;
  answer: VoteOptionCode;
};
