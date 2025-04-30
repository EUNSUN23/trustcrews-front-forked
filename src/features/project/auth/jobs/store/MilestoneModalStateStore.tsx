import { CreateMilestoneInput } from '@/features/project/auth/jobs/service/milestone/createMilestone';
import { atom, DefaultValue, selectorFamily } from 'recoil';
import { ModalState } from '@/utils/type';
import { UpdateMilestoneInput } from '@/features/project/auth/jobs/service/milestone/updateMilestone';

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

interface MilestoneModModalState extends ModalState {
  milestoneId: string;
  updateDate: string;
}

export const milestoneModModalStateStore = atom<MilestoneModModalState>({
  key: 'milestoneModModalStateStore',
  default: {
    isOpen: false,
    title: '마일스톤 수정',
    milestoneId: '0',
    updateDate: '',
  },
});

export type MilestoneModDataKey = keyof UpdateMilestoneInput;
export type MilestoneModDataField<T> = UpdateMilestoneInput[Extract<
  MilestoneModDataKey,
  T
>];

const DEFAULT_MOD_MILESTONE_DATA: UpdateMilestoneInput = {
  startDate: '',
  endDate: '',
  content: '',
};

export const milestoneModDataStateStore = atom<UpdateMilestoneInput>({
  key: 'milestoneModDataStateStore',
  default: DEFAULT_MOD_MILESTONE_DATA,
});

export const milestoneModDataStateSelector = selectorFamily({
  key: 'milestoneModDataStateSelector',
  get:
    (param: MilestoneModDataKey) =>
    ({ get }) => {
      const state = get(milestoneModDataStateStore);
      return state[param];
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
