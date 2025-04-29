import { ModalState } from '@/utils/type';
import { atom } from 'recoil';

type RCVoteNoticeModalState = ModalState & {
  voteId: string;
  alertId: string;
  applyId: string;
};

export const rcVoteNoticeModalState = atom<RCVoteNoticeModalState>({
  key: 'rcVoteNoticeModalStateStore',
  default: {
    isOpen: false,
    title: '',
    voteId: '0',
    alertId: '0',
    applyId: '0',
  },
});
