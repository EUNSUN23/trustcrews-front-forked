import { PROJECT_MENU } from '@/entities/project/constants/projectMenu';

export type ProjectMenu =
  | keyof typeof PROJECT_MENU
  | keyof (typeof PROJECT_MENU)['CREWS']['child'];
