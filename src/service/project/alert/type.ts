import { AlertType } from '@/service/project/alert/constant';
import { ProfileInfo } from '@/utils/type';
import { ProjectAuthMap } from '@/features/project/auth/myProject/global/types/projectAuth';
import {
  FWVoteReason,
  VoteData,
  VoteStatusType,
} from '@/features/project/auth/myProject/vote/types';
import { Notice } from '@/app/project/[slug]/notice/_utils/type';

export type VAlertRecruitData = {
  alertId: bigint;
  voteId: bigint;
  applyId: bigint;
  alertType: typeof AlertType.PRA1002;
  contents: string;
  voteStatus: VoteStatusType;
  createDate: string;
};

export type VAlertRecruitDetailData = {
  applicantInfo: ProfileInfo;
  voteInfo: VoteData & {
    applicant_id: bigint;
  };
};

export type VAlertFWData = {
  alertId: bigint;
  voteId: bigint;
  fwMemberId: bigint;
  alertType: typeof AlertType.PRA1003;
  contents: string;
  voteStatus: VoteStatusType;
  createDate: string;
};

export type AlertCrewData = {
  alertId: bigint;
  projectId: bigint;
  aleretType: typeof AlertType.PRA2001;
  contents: string;
  createDate: string;
};

export type VAlertFWDetailData = VoteData & {
  reason: FWVoteReason;
  fwMemberAuth: ProjectAuthMap;
  fwMemberPosition: {
    id: bigint;
    name: string;
  };
  fwUserProfile: string;
  fwUserNickname: string;
};

export type AlertData =
  | Notice
  | VAlertRecruitData
  | VAlertFWData
  | AlertCrewData;
export type AlertMenuCode = Exclude<
  keyof typeof AlertType,
  'PRA1001' | 'PRA3001'
>;
export type AlertMenu = (typeof AlertType)[AlertMenuCode];
export type AlertMenuName = AlertMenu['name'];
