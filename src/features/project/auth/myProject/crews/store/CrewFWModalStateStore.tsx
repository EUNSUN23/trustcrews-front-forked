import { ModalState } from '@/utils/type';
import { atom } from 'recoil';
import { ProjectAuthCode } from '@/features/project/auth/myProject/global/types/projectAuth';
import { PROJECT_AUTH_CODE } from '@/features/project/auth/myProject/global/constants/projectAuthCode';
import { CreateCrewFWVoteReason } from '@/features/project/auth/myProject/vote/service/createFWVote';

export type CrewFWModalState = ModalState & {
  projectId: bigint;
  crewId: bigint;
  crewPMAuth: ProjectAuthCode;
  userPMAuth: ProjectAuthCode;
};

const { CREW: CREW_AUTH } = PROJECT_AUTH_CODE;

export const DEFAULT_FW_MODAL_STATE: CrewFWModalState = {
  isOpen: false,
  title: '강제탈퇴 투표 신청',
  projectId: 0n,
  crewId: 0n,
  crewPMAuth: CREW_AUTH,
  userPMAuth: CREW_AUTH,
};

export const crewFWModalStateStore = atom<CrewFWModalState>({
  key: 'crewFWModalStateStore',
  default: DEFAULT_FW_MODAL_STATE,
});

export const crewFWModalDataStateStore = atom<CreateCrewFWVoteReason>({
  key: 'crewFWModalDataStateStore',
  default: {
    reason: '',
  },
});
