import { atom, selector, selectorFamily } from 'recoil';
import {
  CreatePost,
  CreatePostForm,
  CreatePostKey,
  CreateProject,
  CreateProjectKey,
} from '@/app/postRegister/_utils/type';

export const createPostStateStore = atom<CreatePost>({
  key: 'createPostStateStore',
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
      const value = get(createPostStateStore)[param];
      return { [param]: value };
    },
  set:
    (param: CreatePostKey) =>
    ({ get, set }, newValue) => {
      const data = get(createPostStateStore);
      set(createPostStateStore, { ...data, ...newValue });
    },
});

export const createProjectStateStore = atom<CreateProject>({
  key: 'createProjectStateStore',
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
      const value = get(createProjectStateStore)[param];
      return { [param]: value };
    },
  set:
    (param: CreateProjectKey) =>
    ({ get, set }, newValue) => {
      const data = get(createProjectStateStore);
      set(createProjectStateStore, { ...data, ...newValue });
    },
});

export const registerPostFormState = selector<CreatePostForm>({
  key: 'registerPostFormState',
  get: ({ get }) => {
    const board = get(createPostStateStore);
    const project = get(createProjectStateStore);
    return { board, project };
  },
});
