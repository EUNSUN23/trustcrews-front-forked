import { atom } from 'recoil';
import { AlertModalState } from '@/store/project/alert/type';

type VAlertRecruitModalState = AlertModalState & {
  voteId: bigint;
  alertId: bigint;
  applyId: bigint;
};
export const vAlertRecruitModalState = atom<VAlertRecruitModalState>({
  key: 'vAlertRecruitModalStateStore',
  default: {
    isOpen: false,
    title: '',
    voteId: 0n,
    alertId: 0n,
    applyId: 0n,
  },
});

export type VAlertFWModalState = AlertModalState & {
  voteId: bigint;
  fwMemberId: bigint;
};
export const vAlertFWModalState = atom<VAlertFWModalState>({
  key: 'vAlertFWModalState',
  default: {
    isOpen: false,
    title: '',
    voteId: 0n,
    fwMemberId: 0n,
  },
});
