import { atom } from 'recoil';
import { PROJECT_MENU } from '@/features/project/auth/myProject/global/constants/projectMenu';

const {
  TASK: { value: PROJECT_TASK },
} = PROJECT_MENU;
type ProjectMenuKeyType = keyof typeof PROJECT_MENU;

export const projectActiveNavState = atom<ProjectMenuKeyType>({
  key: 'projectActiveNavState',
  default: PROJECT_TASK,
});
