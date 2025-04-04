import { atom } from 'recoil';

export const projectIdState = atom<string | null>({
  key: 'projectIdState',
  default: null,
});
