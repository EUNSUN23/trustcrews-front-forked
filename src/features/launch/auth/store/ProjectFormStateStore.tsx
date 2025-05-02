import { atom, DefaultValue, selectorFamily } from 'recoil';
import { CreateProjectInput } from '@/features/project/auth/createProject/service/createProject';

export const projectFormStateStore = atom<CreateProjectInput>({
  key: 'projectFormStateStore',
  default: {
    name: '',
    subject: '',
    startDate: '',
    endDate: '',
    technologyIds: [],
  },
});

export const projectFormFieldSelector = <K extends keyof CreateProjectInput>(
  key: K,
): ReturnType<typeof projectFormFieldSelectorFamily<K>> => {
  return projectFormFieldSelectorFamily<K>(key);
};

const projectFormFieldSelectorFamily = <K extends keyof CreateProjectInput>(
  key: K,
) =>
  selectorFamily<CreateProjectInput[K], K>({
    key: 'projectFormFieldSelectorFamily',
    get:
      (param) =>
      ({ get }) => {
        const state = get(projectFormStateStore);
        return state[param];
      },
    set:
      (param) =>
      ({ get, set }, newValue) => {
        if (newValue instanceof DefaultValue) return;
        const data = get(projectFormStateStore);
        set(projectFormStateStore, { ...data, [param]: newValue });
      },
  })(key);
