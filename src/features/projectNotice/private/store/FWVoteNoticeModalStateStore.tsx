import { atom } from 'recoil';
import { FWVoteBaseParams } from '@/service/projectVote/private/forceWithdrawVote';
import { ModalState } from '@/shared/types/modalState';

export interface FWNoticeModalState
  extends ModalState,
    Omit<FWVoteBaseParams, 'projectId' | 'voteId' | 'crewId'> {
  projectId: string;
  voteId: string;
  crewId: string;
}

const DEFAULT_FW_NOTICE_MODAL_STATE: FWNoticeModalState = {
  isOpen: false,
  title: '',
  projectId: '0',
  voteId: '0',
  crewId: '0',
  crewAuth: '',
  userAuth: '',
};

export const fwNoticeModalState = atom<FWNoticeModalState>({
  key: 'fwNoticeModalState',
  default: DEFAULT_FW_NOTICE_MODAL_STATE,
});
