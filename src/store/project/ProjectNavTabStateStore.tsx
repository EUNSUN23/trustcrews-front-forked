import { atom } from 'recoil';
import { ProjectMenuKeyType } from '@/app/project/_utils/type';
import { PROJECT_MENU as PM } from '@/app/project/_utils/constant';

export const projectActiveNavState = atom<ProjectMenuKeyType>({
  key: 'projectActiveNavState',
  default: PM.TASK.value,
});
