import {atom, selector, selectorFamily} from 'recoil';
import {
  CreatePost,
  CreatePostForm,
  CreatePostKey,
  CreateProject,
  CreateProjectKey,
} from '@/app/postRegister/_utils/type';

export const postFormStateStore = atom<CreatePost>({
  key: 'postFormStateStore',
  default: {
    title: '',
    content: '',
    positionIds: [],
    contact: '',
  },
});

export const postFieldSelector = selectorFamily<
  Partial<CreatePost>,
  CreatePostKey
>({
  key: 'postFieldSelector',
  get:
    (param: CreatePostKey) =>
    ({ get }) => {
      const value = get(postFormStateStore)[param];
      return { [param]: value };
    },
  set:
    (param: CreatePostKey) =>
    ({ get, set }, newValue) => {
      const data = get(postFormStateStore);
      set(postFormStateStore, { ...data, ...newValue });
    },
});

export const projectFormStateStore = atom<CreateProject>({
  key: 'projectFormStateStore',
  default: {
    name: '',
    subject: '',
    startDate: '',
    endDate: '',
    technologyIds: [],
  },
});

export const projectFieldSelector = selectorFamily<
  Partial<CreateProject>,
  CreateProjectKey
>({
  key: 'projectFieldSelector',
  get:
    (param: CreateProjectKey) =>
    ({ get }) => {
      const value = get(projectFormStateStore)[param];
      return { [param]: value };
    },
  set:
    (param: CreateProjectKey) =>
    ({ get, set }, newValue) => {
      const data = get(projectFormStateStore);
      set(projectFormStateStore, { ...data, ...newValue });
    },
});

export const projectPostFormState = selector<CreatePostForm>({
  key: 'projectPostFormState',
  get: ({ get }) => {
    const board = get(postFormStateStore);
    const project = get(projectFormStateStore);
    return { board, project };
  },
});
