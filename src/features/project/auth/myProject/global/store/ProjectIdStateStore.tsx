import { atom } from 'recoil';

export const projectIdState = atom<string>({
  key: 'projectIdState',
  default: '',
});
