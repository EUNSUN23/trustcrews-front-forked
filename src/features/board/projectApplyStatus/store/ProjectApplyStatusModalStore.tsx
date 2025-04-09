import { atom } from 'recoil';

interface ProjectApplyStatusModalState {
  isOpen: boolean;
}

export const projectApplyStatusModalStore = atom<ProjectApplyStatusModalState>({
  key: 'projectApplyStatusModalState',
  default: {
    isOpen: false,
  },
});
