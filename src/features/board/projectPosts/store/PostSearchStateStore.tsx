import { atom } from 'recoil';
import { TechStackWithCategory } from '@/utils/type';

export const selectedTechStackState = atom<TechStackWithCategory[]>({
  key: 'selectedTechStackState',
  default: [],
});

export const selectedPositionState = atom<string>({
  key: 'selectedPositionState',
  default: '0',
});

export const postSearchValue = atom<string>({
  key: 'postSearchValue',
  default: '',
});
