import { atom } from 'recoil';
import { ProjectMenu } from '@/features/project/auth/types/myProject/projectMenu';
import { PROJECT_MENU } from '@/features/project/auth/constants/myProject/projectMenu';

const {
  TASK: { value: PROJECT_TASK },
} = PROJECT_MENU;

export const projectActiveNavState = atom<ProjectMenu>({
  key: 'projectActiveNavState',
  default: PROJECT_TASK,
});
