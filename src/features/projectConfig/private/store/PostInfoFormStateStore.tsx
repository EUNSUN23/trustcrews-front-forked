import { atom, DefaultValue, selectorFamily } from 'recoil';
import { UpdatePostInfoInput } from '@/service/post/private/updatePostInfo';

const DEFAULT_POST_INFO_FORM: UpdatePostInfoInput = {
  title: '',
  content: '',
  recruitmentStatus: null,
  contact: '',
  positionIds: [],
};

export const postInfoFormStateStore = atom<UpdatePostInfoInput>({
  key: 'postInfoFormStateStore',
  default: DEFAULT_POST_INFO_FORM,
});

export const postInfoFormFieldSelector = <K extends keyof UpdatePostInfoInput>(
  key: K,
): ReturnType<typeof postInfoFormFieldSelectorFamily<K>> => {
  return postInfoFormFieldSelectorFamily<K>(key);
};

const postInfoFormFieldSelectorFamily = <K extends keyof UpdatePostInfoInput>(
  key: K,
) =>
  selectorFamily<UpdatePostInfoInput[K], K>({
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
