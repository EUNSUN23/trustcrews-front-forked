import { ConfirmModalState, SnackbarState } from '@/utils/type';
import { atom } from 'recoil';

export const snackbarState = atom<SnackbarState>({
  key: 'snackbarState',
  default: { show: false, type: 'INFO', content: '' },
});

export const confirmModalState = atom<ConfirmModalState>({
  key: 'confirmModalState',
  default: {
    isOpen: false,
    title: '',
    content: '',
    onClickConfirmHandler: () => {},
  },
});
