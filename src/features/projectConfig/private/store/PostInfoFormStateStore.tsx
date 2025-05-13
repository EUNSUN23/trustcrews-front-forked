import { atom, DefaultValue, selectorFamily } from 'recoil';
import { UpdatePostConfigInput } from '@/features/projectConfig/private/service/post/updatePostConfig';

const DEFAULT_POST_INFO_FORM: UpdatePostConfigInput = {
  title: '',
  content: '',
  recruitmentStatus: null,
  contact: '',
  positionIds: [],
};

export const postInfoFormStateStore = atom<UpdatePostConfigInput>({
  key: 'postInfoFormStateStore',
  default: DEFAULT_POST_INFO_FORM,
});

export const postInfoFormFieldSelector = <
  K extends keyof UpdatePostConfigInput,
>(
  key: K,
): ReturnType<typeof postInfoFormFieldSelectorFamily<K>> => {
  return postInfoFormFieldSelectorFamily<K>(key);
};

const postInfoFormFieldSelectorFamily = <K extends keyof UpdatePostConfigInput>(
  key: K,
) =>
  selectorFamily<UpdatePostConfigInput[K], K>({
    key: 'postInfoFormFieldSelector',
    get:
      (param) =>
      ({ get }) => {
        const res = get(postInfoFormStateStore);
        return res[param];
      },
    set:
      (param) =>
      ({ get, set }, newValue) => {
        if (newValue instanceof DefaultValue) return;
        const prev = get(postInfoFormStateStore);
        set(postInfoFormStateStore, { ...prev, [param]: newValue });
      },
  })(key);
