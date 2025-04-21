import { CreateMilestoneInput } from '@/features/project/auth/myProject/jobs/service/milestone/createMilestone';
import { atom, DefaultValue, selectorFamily } from 'recoil';
import { ModalState } from '@/utils/type';
import { UpdateMilestoneInput } from '@/features/project/auth/myProject/jobs/service/milestone/updateMilestone';

export type MilestoneAddDataKey = keyof CreateMilestoneInput;
export type MilestoneAddDataField<T> = CreateMilestoneInput[Extract<
  MilestoneAddDataKey,
  T
>];

export const milestoneAddModalStateStore = atom<ModalState>({
  key: 'milestoneAddModalStateStore',
  default: {
    isOpen: false,
    title: '마일스톤 추가',
  },
});

const DEFAULT_ADD_MILESTONE_DATA = {
  startDate: '',
  endDate: '',
  content: '',
} as const;

export const milestoneAddDataStateStore = atom<CreateMilestoneInput>({
  key: 'milestoneAddDataStateStore',
  default: DEFAULT_ADD_MILESTONE_DATA,
});

export const milestoneAddDataStateSelector = selectorFamily({
  key: 'milestoneAddDataStateSelector',
  get:
    (param: MilestoneAddDataKey) =>
    ({ get }) => {
      const state = get(milestoneAddDataStateStore);
      return state[param] as MilestoneAddDataField<typeof param>;
    },
  set:
    (param: MilestoneAddDataKey) =>
    ({ get, set }, newValue) => {
      if (newValue instanceof DefaultValue) return;

      const state = get(milestoneAddDataStateStore);
      const updated = { ...state, [param]: newValue };
      set(milestoneAddDataStateStore, updated);
    },
});

export type MilestoneModData = UpdateMilestoneInput & {
  milestoneId: bigint;
  updateDate: string;
};
export type MilestoneModDataKey = keyof MilestoneModData;
export type MilestoneModDataField<T> = MilestoneModData[Extract<
  MilestoneModDataKey,
  T
>];

export const milestoneModModalStateStore = atom<ModalState>({
  key: 'milestoneModModalStateStore',
  default: {
    isOpen: false,
    title: '마일스톤 수정',
  },
});

const DEFAULT_MOD_MILESTONE_DATA = {
  milestoneId: 0n,
  startDate: '',
  endDate: '',
  updateDate: '',
  content: '',
};

export const milestoneModDataStateStore = atom<MilestoneModData>({
  key: 'milestoneModDataStateStore',
  default: DEFAULT_MOD_MILESTONE_DATA,
});

export const milestoneModDataStateSelector = selectorFamily({
  key: 'milestoneModDataStateSelector',
  get:
    (param: MilestoneModDataKey) =>
    ({ get }) => {
      const state = get(milestoneModDataStateStore);
      return state[param] as MilestoneModDataField<typeof param>;
    },
  set:
    (param: MilestoneModDataKey) =>
    ({ get, set }, newValue) => {
      if (newValue instanceof DefaultValue) return;

      const state = get(milestoneModDataStateStore);
      const updated = { ...state, [param]: newValue };
      set(milestoneModDataStateStore, updated);
    },
});
