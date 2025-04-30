import { VOTE_OPTIONS } from '@/features/project/auth/projectVote/constants/voteOptions';
import { FW_VOTE_REASONS } from '@/features/project/auth/projectVote/constants/fwVoteReasons';
import { VOTE_STATUS } from '@/features/project/auth/projectVote/constants/voteStatus';

export type VoteOptionCode = keyof typeof VOTE_OPTIONS;
export type VoteOptionType = (typeof VOTE_OPTIONS)[VoteOptionCode];

export type VoteStatusCode = keyof typeof VOTE_STATUS;

export type VoteStatusType =
  | typeof VOTE_STATUS.VSTAT1001
  | typeof VOTE_STATUS.VSTAT1002;

export type VoteData = {
  voteId: bigint;
  voteStatus: VoteStatusType;
  agrees: number;
  disagrees: number;
  maxVoteCount: number;
};

export type FWVoteReasonCode = keyof typeof FW_VOTE_REASONS;
export type FWVoteReason = (typeof FW_VOTE_REASONS)[FWVoteReasonCode];
