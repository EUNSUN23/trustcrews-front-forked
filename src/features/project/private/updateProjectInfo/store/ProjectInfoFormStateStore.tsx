import { atom, DefaultValue, selectorFamily } from 'recoil';
import { UpdateProjectInfoInput } from '@/features/project/auth/updateProjectInfo/service/updateProjectInfo';

interface UpdateProjectInfoFormState
  extends Omit<UpdateProjectInfoInput, 'technologyIds'> {
  technologyIds: string[];
}

const DEFAULT_PROJECT_INFO_FORM: UpdateProjectInfoFormState = {
  projectName: '',
  projectSubject: '',
  startDate: '',
  endDate: '',
  technologyIds: [],
};

export const projectInfoFormStateStore = atom<UpdateProjectInfoFormState>({
  key: 'projectInfoFormStateStore',
  default: DEFAULT_PROJECT_INFO_FORM,
});

export const projectInfoFormSelector = <
  K extends keyof UpdateProjectInfoFormState,
>(
  key: K,
): ReturnType<typeof projectSettingInfoSelectorFamily<K>> => {
  return projectSettingInfoSelectorFamily<K>(key);
};

const projectSettingInfoSelectorFamily = <
  K extends keyof UpdateProjectInfoFormState,
>(
  key: K,
) =>
  selectorFamily<UpdateProjectInfoFormState[K], K>({
    key: 'projectSettingInfoSelector',
    get:
      (param) =>
      ({ get }) => {
        const res = get(projectInfoFormStateStore);
        return res[param];
      },
    set:
      (param) =>
      ({ get, set }, newValue) => {
        if (newValue instanceof DefaultValue) return;
        const prev = get(projectInfoFormStateStore);
        set(projectInfoFormStateStore, { ...prev, [param]: newValue });
      },
  })(key);
