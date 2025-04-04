import { atom } from 'recoil';

export const selectRecruitPositionState = atom<string>({
  key: 'selectRecruitPositionState',
  default: '0',
});
