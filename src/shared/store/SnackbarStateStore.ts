import { atom } from 'recoil';

export type SnackbarType = 'INFO' | 'ERROR' | 'SUCCESS';

export type SnackbarState = {
  show: boolean;
  type: SnackbarType;
  content: string;
  duration?: number;
};

export const snackbarState = atom<SnackbarState>({
  key: 'snackbarState',
  default: { show: false, type: 'INFO', content: '' },
});
