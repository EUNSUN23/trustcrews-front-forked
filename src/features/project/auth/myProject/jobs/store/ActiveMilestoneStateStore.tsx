import { atom } from 'recoil';

import { MilestoneInfo } from '@/features/project/auth/myProject/jobs/types/milestone';

type ActiveMilestoneState = MilestoneInfo;

export const DEFAULT_ACTIVE_MILESTONE = {
  milestoneId: 0n,
  projectId: 0n,
  content: '',
  createDate: '',
  startDate: '',
  endDate: '',
  updateDate: '',
  index: 0,
  authMap: {
    code: '',
    name: '',
    workChangeYN: false,
    milestoneChangeYN: false,
    configYn: false,
  },
} as const;

export const activeMilestoneStateStore = atom<ActiveMilestoneState>({
  key: 'activeMilestoneStateStore',
  default: DEFAULT_ACTIVE_MILESTONE,
});
