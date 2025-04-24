import { atom } from 'recoil';

type ActiveMilestoneState = {
  milestoneId: bigint;
  index: number;
};

export const DEFAULT_ACTIVE_MILESTONE = {
  milestoneId: 0n,
  index: 0,
} as const;

export const activeMilestoneStateStore = atom<ActiveMilestoneState>({
  key: 'activeMilestoneStateStore',
  default: DEFAULT_ACTIVE_MILESTONE,
});
