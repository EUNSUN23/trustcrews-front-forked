import { atom } from 'recoil';
import { ModalState } from '@/shared/types/modalState';

type RCVoteNoticeModalState = ModalState & {
  voteId: string;
  alertId: string;
  applyId: string;
  userAuth: string;
};

export const rcVoteNoticeModalState = atom<RCVoteNoticeModalState>({
  key: 'rcVoteNoticeModalStateStore',
  default: {
    isOpen: false,
    title: '',
    voteId: '0',
    alertId: '0',
    applyId: '0',
    userAuth: '',
  },
});
