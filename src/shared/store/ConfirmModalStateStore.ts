import { atom } from 'recoil';
import { ConfirmModalState } from '@/utils/type';

export const confirmModalStateStore = atom<ConfirmModalState>({
  key: 'confirmModalStateStore',
  default: {
    isOpen: false,
    title: '',
    content: '',
    onClickConfirmHandler: () => {},
  },
});
