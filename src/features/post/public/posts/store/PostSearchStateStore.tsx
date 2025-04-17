import { atom } from 'recoil';
import {
  PositionId,
  PositionName,
  SelectItem,
  TechStackWithCategory,
} from '@/utils/type';
import { DEFAULT_POSITION_OPTION } from '@/utils/constant';

export const selectedTechStackState = atom<TechStackWithCategory[]>({
  key: 'selectedTechStackState',
  default: [],
});

export const selectedPositionState = atom<SelectItem<PositionName, PositionId>>(
  {
    key: 'selectedPositionState',
    default: DEFAULT_POSITION_OPTION,
  },
);

export const postSearchValue = atom<string>({
  key: 'postSearchValue',
  default: '',
});
