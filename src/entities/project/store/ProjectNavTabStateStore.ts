import { atom } from 'recoil';
import { ProjectMenu } from '@/entities/project/types/projectMenu';
import { PROJECT_MENU } from '@/entities/project/constants/projectMenu';

const {
  TASK: { value: PROJECT_TASK },
} = PROJECT_MENU;

export const projectActiveNavState = atom<ProjectMenu>({
  key: 'projectActiveNavState',
  default: PROJECT_TASK,
});
