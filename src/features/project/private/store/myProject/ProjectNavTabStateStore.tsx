import { atom } from 'recoil';
import { ProjectMenu } from '@/features/project/private/types/myProject/projectMenu';
import { PROJECT_MENU } from '@/features/project/private/constants/myProject/projectMenu';

const {
  TASK: { value: PROJECT_TASK },
} = PROJECT_MENU;

export const projectActiveNavState = atom<ProjectMenu>({
  key: 'projectActiveNavState',
  default: PROJECT_TASK,
});
