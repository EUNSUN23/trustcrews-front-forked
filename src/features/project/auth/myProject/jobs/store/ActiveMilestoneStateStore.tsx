import { atom } from 'recoil';

type ActiveMilestoneState = {
  milestoneId: bigint;
  index: number;
  startDate: string;
  endDate: string;
};

export const DEFAULT_ACTIVE_MILESTONE = {
  milestoneId: 0n,
  index: 0,
  startDate: '',
  endDate: '',
} as const;

export const activeMilestoneStateStore = atom<ActiveMilestoneState>({
  key: 'activeMilestoneStateStore',
  default: DEFAULT_ACTIVE_MILESTONE,
});
