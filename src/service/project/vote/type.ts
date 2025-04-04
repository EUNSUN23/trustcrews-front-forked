import { ProjectAuthMap, ProjectAuthMapCode } from '@/utils/type';
import { VoteOption } from '@/service/project/vote/constant';

export type VoteOptionCode = keyof typeof VoteOption;
export type VoteOptionType = (typeof VoteOption)[VoteOptionCode];

export type VoteRecruitReqData = {
  voteId: bigint;
  applyId: bigint;
  authMap: ProjectAuthMapCode;
  answer: VoteOptionCode;
};

export type VoteFWReqData = {
  projectId: bigint;
  voteId: bigint;
  fw_member_id: bigint;
  fw_member_auth: ProjectAuthMapCode;
  authMap: ProjectAuthMapCode;
  answer: VoteOptionCode;
};
