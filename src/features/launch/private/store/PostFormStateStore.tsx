import { atom, DefaultValue, selectorFamily } from 'recoil';
import { CreatePostInput } from '@/service/post/private/createPost';

export const postFormStateStore = atom<CreatePostInput>({
  key: 'postFormStateStore',
  default: {
    title: '',
    content: '',
    contact: '',
    positionIds: [],
  },
});

export const postFormFieldSelector = <K extends keyof CreatePostInput>(
  key: K,
): ReturnType<typeof postFormFieldSelectorFamily<K>> => {
  return postFormFieldSelectorFamily<K>(key);
};

const postFormFieldSelectorFamily = <K extends keyof CreatePostInput>(key: K) =>
  selectorFamily<CreatePostInput[K], K>({
    key: 'postFormFieldSelectorFamily',
    get:
      (param) =>
      ({ get }) => {
        const state = get(postFormStateStore);
        return state[param];
      },
    set:
      (param) =>
      ({ get, set }, newValue) => {
        if (newValue instanceof DefaultValue) return;
        const prev = get(postFormStateStore);
        set(postFormStateStore, { ...prev, [param]: newValue });
      },
  })(key);
