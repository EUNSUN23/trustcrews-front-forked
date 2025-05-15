import { PROJECT_MENU } from '@/features/project/auth/constants/myProject/projectMenu';

export type ProjectMenu =
  | keyof typeof PROJECT_MENU
  | keyof (typeof PROJECT_MENU)['CREWS']['child'];
