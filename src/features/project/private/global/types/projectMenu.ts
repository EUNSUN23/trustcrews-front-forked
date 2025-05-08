import { PROJECT_MENU } from '@/features/project/auth/global/constants/projectMenu';

export type ProjectMenu =
  | keyof typeof PROJECT_MENU
  | keyof (typeof PROJECT_MENU)['CREWS']['child'];
