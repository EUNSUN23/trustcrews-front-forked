import { atom } from 'recoil';
import { ProjectAuthMap } from '@/features/project/auth/myProject/global/types/projectAuth';
import { PROJECT_AUTH_CODE } from '@/features/project/auth/myProject/global/constants/projectAuthCode';

const { CREW: CREW_AUTH } = PROJECT_AUTH_CODE;
export const DEFAULT_PM_AUTH = {
  code: CREW_AUTH,
  name: '',
  workChangeYN: false,
  milestoneChangeYN: false,
  configYn: false,
} as const;

export const projectManageAuthStateStore = atom<ProjectAuthMap>({
  key: 'projectManageAuthStateStore',
  default: DEFAULT_PM_AUTH,
});
