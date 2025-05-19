import { VOTE_OPTIONS } from '@/constants/data/projectVote/voteOptions';
import { VOTE_STATUS } from '@/constants/data/projectVote/voteStatus';
import { FW_VOTE_REASONS } from '@/constants/data/projectVote/fwVoteReasons';

export type VoteOptionCode = keyof typeof VOTE_OPTIONS;
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
