import { atom } from 'recoil';
import { ModalState } from '@/utils/type';

export type FWNoticeModalState = ModalState & {
  voteId: string;
  fwMemberId: string;
};

export const fwNoticeModalState = atom<FWNoticeModalState>({
  key: 'fwNoticeModalState',
  default: {
    isOpen: false,
    title: '',
    voteId: '0',
    fwMemberId: '0',
  },
});
