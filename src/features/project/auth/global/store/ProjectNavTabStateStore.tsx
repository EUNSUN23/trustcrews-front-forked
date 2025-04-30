import { atom } from 'recoil';
import { PROJECT_MENU } from '@/features/project/auth/global/constants/projectMenu';
import { ProjectMenu } from '@/features/project/auth/global/types/projectMenu';

const {
  TASK: { value: PROJECT_TASK },
} = PROJECT_MENU;

export const projectActiveNavState = atom<ProjectMenu>({
  key: 'projectActiveNavState',
  default: PROJECT_TASK,
});
