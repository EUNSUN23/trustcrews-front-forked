import { JSX } from 'react';
import { atom } from 'recoil';

import { ModalState } from '@/shared/types/ui';

export interface ConfirmModalState extends ModalState {
  content: string | JSX.Element;
  onClickConfirmHandler: () => void;
}

export const confirmModalStateStore = atom<ConfirmModalState>({
  key: 'confirmModalStateStore',
  default: {
    isOpen: false,
    title: '',
    content: '',
    onClickConfirmHandler: () => {},
  },
});
