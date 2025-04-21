import { ProjectAuthMap } from '@/utils/type';
import { atom } from 'recoil';

const DEFAULT_PM_AUTH = {
  code: '',
  name: '',
  workChangeYN: false,
  milestoneChangeYN: false,
  configYn: false,
} as const;

export const projectManageAuthStateStore = atom<ProjectAuthMap>({
  key: 'projectManageAuthStateStore',
  default: DEFAULT_PM_AUTH,
});
