import { PROJECT_AUTH_CODE } from '@/constants/data/projectAuthCode';

export type ProjectAuthCode =
  (typeof PROJECT_AUTH_CODE)[keyof typeof PROJECT_AUTH_CODE];

export type ProjectAuthMap = {
  code: ProjectAuthCode;
  name: string;
  workChangeYN: boolean;
  milestoneChangeYN: boolean;
  configYn: boolean;
};
