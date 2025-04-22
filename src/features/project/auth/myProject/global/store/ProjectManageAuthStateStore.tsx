import { atom } from 'recoil';
import { ProjectAuthMap } from '@/features/project/auth/myProject/global/types/projectAuth';

const DEFAULT_PM_AUTH = {
  code: 'PAUTH_2001',
  name: '크루',
  workChangeYN: false,
  milestoneChangeYN: false,
  configYn: false,
} as const;

export const projectManageAuthStateStore = atom<ProjectAuthMap>({
  key: 'projectManageAuthStateStore',
  default: DEFAULT_PM_AUTH,
});
